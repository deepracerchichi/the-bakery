import Post from "@/lib/models/Posts";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const count = await Post.countDocuments();
  return NextResponse.json({ status: "connected", postCount: count });
}