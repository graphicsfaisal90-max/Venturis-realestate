import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/lib/models/Property";
import Agent from "@/lib/models/Agent";
import Inquiry from "@/lib/models/Inquiry";
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

    const [
      totalProperties,
      totalAgents,
      totalInquiries,
      totalMessages,
      featuredProperties,
      unreadInquiries,
      unreadMessages,
    ] = await Promise.all([
      Property.countDocuments(),
      Agent.countDocuments(),
      Inquiry.countDocuments(),
      ContactMessage.countDocuments(),
      Property.countDocuments({ isFeatured: true }),
      Inquiry.countDocuments({ isRead: false }),
      ContactMessage.countDocuments({ isRead: false }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProperties,
        totalAgents,
        totalInquiries,
        totalMessages,
        featuredProperties,
        unreadInquiries,
        unreadMessages,
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
