import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
