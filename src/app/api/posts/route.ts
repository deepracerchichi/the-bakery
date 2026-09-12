import Post from "@/lib/models/Posts";
import dbConnect from "@/lib/mongodb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await dbConnect();

    const body = await request.json();
    const {title, body: content, imageUrl} = body;

    if (!title || !content) {
        return NextResponse.json(
            {error: "Title and body are required"},
            {status: 400}
        )
    }

    const post = await Post.create({title, body: content, imageUrl});

    return NextResponse.json(post, {status: 201});
}

export async function GET() {
    await dbConnect();
    const posts = await Post.find().sort({createdAt: -1});
    return NextResponse.json(posts);
}