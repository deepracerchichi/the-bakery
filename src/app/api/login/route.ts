import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USER = process.env.ADMIN_USER;
const SESSION_SECRET = process.env.SESSION_SECRET;

export async function POST(request: NextRequest) {
  if (!ADMIN_PASSWORD || !ADMIN_USER || !SESSION_SECRET) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const { password, username } = await request.json();

  if (password !== ADMIN_PASSWORD || username !== ADMIN_USER) {
    return NextResponse.json({ error: "Incorrect password or username" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  const sessionToken = crypto
    .createHash("sha256")
    .update(ADMIN_PASSWORD + SESSION_SECRET)
    .digest("hex");

  response.cookies.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}