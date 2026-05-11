import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Agent from "@/lib/models/Agent";

export async function GET() {
  try {
    await connectDB();
    const agents = await Agent.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: agents });
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agents" },
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
    const agent = await Agent.create(body);
    return NextResponse.json({ success: true, data: agent }, { status: 201 });
  } catch (error) {
    console.error("POST /api/agents error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create agent" },
      { status: 500 }
    );
  }
}
