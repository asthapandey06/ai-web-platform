import type { Pool } from "pg";

export type MerchantAccount = {
  id: string;
  email: string;
  displayName: string;
};

type MerchantRow = {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
};

let schemaReady: Promise<void> | undefined;

export function ensureAuthSchema(pool: Pool): Promise<void> {
  schemaReady ??= pool
    .query(`
      CREATE TABLE IF NOT EXISTS merchant_accounts (
        id text PRIMARY KEY,
        email text NOT NULL UNIQUE,
        display_name text NOT NULL,
        password_hash text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS merchant_sessions (
        token_hash text PRIMARY KEY,
        merchant_id text NOT NULL REFERENCES merchant_accounts(id) ON DELETE CASCADE,
        expires_at timestamptz NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS merchant_sessions_expiry_idx
        ON merchant_sessions (expires_at);
    `)
    .then(() => undefined);
  return schemaReady;
}

export async function createMerchant(
  pool: Pool,
  merchant: { id: string; email: string; displayName: string; passwordHash: string },
): Promise<MerchantAccount> {
  const result = await pool.query<MerchantRow>(
    `INSERT INTO merchant_accounts (id, email, display_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, display_name, password_hash`,
    [merchant.id, merchant.email, merchant.displayName, merchant.passwordHash],
  );
  return toAccount(result.rows[0]);
}

export async function findMerchantByEmail(pool: Pool, email: string): Promise<MerchantRow | undefined> {
  const result = await pool.query<MerchantRow>(
    `SELECT id, email, display_name, password_hash
     FROM merchant_accounts
     WHERE email = $1`,
    [email],
  );
  return result.rows[0];
}

export async function createSession(
  pool: Pool,
  session: { tokenHash: string; merchantId: string; expiresAt: Date },
): Promise<void> {
  await pool.query(
    `INSERT INTO merchant_sessions (token_hash, merchant_id, expires_at)
     VALUES ($1, $2, $3)`,
    [session.tokenHash, session.merchantId, session.expiresAt],
  );
}

export async function findMerchantBySession(
  pool: Pool,
  tokenHash: string,
): Promise<MerchantAccount | undefined> {
  const result = await pool.query<MerchantRow>(
    `SELECT a.id, a.email, a.display_name, a.password_hash
     FROM merchant_sessions s
     JOIN merchant_accounts a ON a.id = s.merchant_id
     WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [tokenHash],
  );
  return result.rows[0] ? toAccount(result.rows[0]) : undefined;
}

export async function deleteSession(pool: Pool, tokenHash: string): Promise<void> {
  await pool.query("DELETE FROM merchant_sessions WHERE token_hash = $1", [tokenHash]);
}

function toAccount(row: MerchantRow): MerchantAccount {
  return { id: row.id, email: row.email, displayName: row.display_name };
}
