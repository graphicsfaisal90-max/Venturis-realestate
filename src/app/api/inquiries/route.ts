import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Inquiry from "@/lib/models/Inquiry";

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
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("GET /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
