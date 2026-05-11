import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find().sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const post = await BlogPost.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
