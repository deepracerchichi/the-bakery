import { NextRequest } from "next/server";
import crypto from "crypto";

export function isAuthenticated(request: NextRequest): boolean {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const SESSION_SECRET = process.env.SESSION_SECRET;

  if (!ADMIN_PASSWORD || !SESSION_SECRET) return false;

  const sessionCookie = request.cookies.get("admin_session")?.value;
  if (!sessionCookie) return false;

  const expectedToken = crypto
    .createHash("sha256")
    .update(ADMIN_PASSWORD + SESSION_SECRET)
    .digest("hex");

  return sessionCookie === expectedToken;
}