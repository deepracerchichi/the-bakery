import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await dbConnect();
  const deleted = await Post.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}