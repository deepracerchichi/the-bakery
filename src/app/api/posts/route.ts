import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const body = await request.json();
  const { title, body: content, imageUrl } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 }
    );
  }

  const post = await Post.create({ title, body: content, imageUrl });

  return NextResponse.json(post, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}