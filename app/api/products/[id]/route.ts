import { connectDB } from "@/lib/db/mongodb";
import { Product } from "@/models/product";
import { Review } from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).populate("category");

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const reviews = await Review.find({
      product: params.id,
      isApproved: true,
    })
      .populate("user", "name avatar")
      .sort("-createdAt")
      .limit(10);

    return NextResponse.json({
      product,
      reviews,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
