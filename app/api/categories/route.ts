import { connectDB } from "@/lib/db/mongodb";
import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const categories = await Category.find({ isActive: true }).sort("name");

    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
