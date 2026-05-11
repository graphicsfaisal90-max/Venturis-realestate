import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/lib/models/Property";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const filter: Record<string, unknown> = {};

    const type = searchParams.get("type");
    if (type) filter.type = type;

    const purpose = searchParams.get("purpose");
    if (purpose) filter.purpose = purpose;

    const status = searchParams.get("status");
    if (status) filter.status = status;

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) (filter.price as Record<string, unknown>).$gte = Number(minPrice);
      if (maxPrice) (filter.price as Record<string, unknown>).$lte = Number(maxPrice);
    }

    const bedrooms = searchParams.get("bedrooms");
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };

    const bathrooms = searchParams.get("bathrooms");
    if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };

    const isFeatured = searchParams.get("isFeatured");
    if (isFeatured === "true") filter.isFeatured = true;

    const location = searchParams.get("location");
    if (location) {
      filter.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.state": { $regex: location, $options: "i" } },
        { "location.address": { $regex: location, $options: "i" } },
      ];
    }

    const properties = await Property.find(filter)
      .populate("agent", "name image title")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties" },
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
    const property = await Property.create(body);
    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create property" },
      { status: 500 }
    );
  }
}
