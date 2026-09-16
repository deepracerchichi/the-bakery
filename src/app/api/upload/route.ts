import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

function isAuthenticated(request: NextRequest): boolean {
  if (!ADMIN_PASSWORD || !SESSION_SECRET) return false;

  const sessionCookie = request.cookies.get("admin_session")?.value;
  if (!sessionCookie) return false;

  const expectedToken = crypto
    .createHash("sha256")
    .update(ADMIN_PASSWORD + SESSION_SECRET)
    .digest("hex");

  return sessionCookie === expectedToken;
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}