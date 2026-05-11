import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/lib/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
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
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
