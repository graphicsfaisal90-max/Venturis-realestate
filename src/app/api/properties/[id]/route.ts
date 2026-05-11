import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/lib/models/Property";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const property = await Property.findById(id).populate("agent", "name image title");
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("GET /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const property = await Property.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("PUT /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Property deleted" });
  } catch (error) {
    console.error("DELETE /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
