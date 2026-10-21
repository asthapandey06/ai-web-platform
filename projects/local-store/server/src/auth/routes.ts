import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response, Router } from "express";
import express from "express";
import {
  createSessionToken,
  hashPassword,
  hashSessionToken,
  verifyPassword,
} from "@websiteos/auth-crypto";
import { getDatabasePool } from "../db/pool.js";
import {
  createMerchant,
  createSession,
  deleteSession,
  ensureAuthSchema,
  findMerchantByEmail,
  findMerchantBySession,
  type MerchantAccount,
} from "./repository.js";

const sessionCookie = "local_store_session";
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;

export function authRouter(): Router {
  const router = express.Router();
  router.post("/register", registrationPolicyUnconfirmed);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogout);
  router.get("/session", requireMerchant, (request, response) => {
    response.json({ authenticated: true, merchant: request.merchant });
  });
  return router;
}

function registrationPolicyUnconfirmed(_request: Request, response: Response): void {
  response.status(409).json({
    error: {
      code: "REGISTRATION_POLICY_UNCONFIRMED",
      message: "Merchant registration is unavailable until registration access and verification rules are confirmed.",
    },
  });
}

export function requireMerchant(request: Request, response: Response, next: NextFunction): void {
  void getMerchantFromRequest(request)
    .then((merchant) => {
      if (!merchant) {
        response.status(401).json({ error: { code: "AUTHENTICATION_REQUIRED", message: "Sign in required." } });
        return;
      }
      request.merchant = merchant;
      next();
    })
    .catch(next);
}

declare global {
  namespace Express {
    interface Request {
      merchant?: MerchantAccount;
    }
  }
}

async function handleRegister(request: Request, response: Response, next: NextFunction): Promise<void> {
  const input = parseCredentials(request.body);
  if (!input.ok) {
    response.status(400).json({ error: { code: "INVALID_INPUT", message: input.message } });
    return;
  }

  try {
    const pool = getDatabasePool();
    await ensureAuthSchema(pool);
    const merchant = await createMerchant(pool, {
      id: randomUUID(),
      email: input.email,
      displayName: input.displayName,
      passwordHash: await hashPassword(input.password),
    });
    await establishSession(response, merchant.id);
    response.status(201).json({ authenticated: true, merchant });
  } catch (error) {
    if (isUniqueViolation(error)) {
      response.status(409).json({ error: { code: "EMAIL_ALREADY_REGISTERED", message: "That email is already registered." } });
      return;
    }
    next(error);
  }
}

async function handleLogin(request: Request, response: Response, next: NextFunction): Promise<void> {
  const input = parseCredentials(request.body, false);
  if (!input.ok) {
    response.status(400).json({ error: { code: "INVALID_INPUT", message: input.message } });
    return;
  }

  try {
    const pool = getDatabasePool();
    await ensureAuthSchema(pool);
    const merchant = await findMerchantByEmail(pool, input.email);
    if (!merchant || !(await verifyPassword(input.password, merchant.password_hash))) {
      response.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Email or password is incorrect." } });
      return;
    }

    const account = { id: merchant.id, email: merchant.email, displayName: merchant.display_name };
    await establishSession(response, account.id);
    response.json({ authenticated: true, merchant: account });
  } catch (error) {
    next(error);
  }
}

async function handleLogout(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const token = request.cookies?.[sessionCookie];
    if (token) {
      const pool = getDatabasePool();
      await ensureAuthSchema(pool);
      await deleteSession(pool, hashSessionToken(token));
    }
    clearSessionCookie(response);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function getMerchantFromRequest(request: Request): Promise<MerchantAccount | undefined> {
  const token = request.cookies?.[sessionCookie];
  if (!token) {
    return undefined;
  }
  const pool = getDatabasePool();
  await ensureAuthSchema(pool);
  return findMerchantBySession(pool, hashSessionToken(token));
}

async function establishSession(response: Response, merchantId: string): Promise<void> {
  const token = createSessionToken();
  const pool = getDatabasePool();
  const expiresAt = new Date(Date.now() + sessionDurationMs);
  await createSession(pool, { tokenHash: hashSessionToken(token), merchantId, expiresAt });
  response.cookie(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

function clearSessionCookie(response: Response): void {
  response.clearCookie(sessionCookie, { httpOnly: true, sameSite: "lax", path: "/" });
}

function parseCredentials(
  body: unknown,
  requiresDisplayName = true,
): { ok: true; email: string; password: string; displayName: string } | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Request body must be an object." };
  }
  const input = body as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const displayName = typeof input.displayName === "string" ? input.displayName.trim() : "";
  if (!email || !email.includes("@") || email.length > 320) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (password.length < 12 || password.length > 200) {
    return { ok: false, message: "Password must be between 12 and 200 characters." };
  }
  if (requiresDisplayName && (!displayName || displayName.length > 120)) {
    return { ok: false, message: "Enter a display name." };
  }
  return { ok: true, email, password, displayName };
}

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}
