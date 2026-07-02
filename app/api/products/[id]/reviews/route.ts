import { connectDB } from "@/lib/db/mongodb";
import { Review } from "@/models/review";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    await connectDB();

    const review = new Review({
      product: params.id,
      user: session.user.id,
      rating: body.rating,
      comment: body.comment,
    });

    await review.save();

    const product = await Product.findById(params.id);
    if (product) {
      const reviews = await Review.find({ product: params.id });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      product.rating = parseFloat(avgRating.toFixed(1));
      product.reviewCount = reviews.length;
      await product.save();
    }

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const reviews = await Review.find({
      product: params.id,
      isApproved: true,
    })
      .populate("user", "name avatar")
      .sort("-createdAt");

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
