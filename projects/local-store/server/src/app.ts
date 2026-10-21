import express from "express";
import cookieParser from "cookie-parser";
import { authRouter, requireMerchant } from "./auth/routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter());
app.get("/api/merchant", requireMerchant, (request, response) => {
  response.json({
    merchant: request.merchant,
    navigation: {
      dashboard: false,
      inventory: true,
      scanner: true,
      settings: true,
    },
  });
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});
