import { connectDB } from "@/lib/db/mongodb";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const products = await Product.find().populate("category").sort("-createdAt");

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    await connectDB();

    const product = new Product(body);
    await product.save();

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
