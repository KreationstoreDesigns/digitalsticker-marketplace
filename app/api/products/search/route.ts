import { connectDB } from "@/lib/db/mongodb";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "10000");
    const sort = searchParams.get("sort") || "newest";

    let query: any = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    let sortOrder: any = { createdAt: -1 };
    if (sort === "pricelow") {
      sortOrder = { price: 1 };
    } else if (sort === "pricehigh") {
      sortOrder = { price: -1 };
    } else if (sort === "rating") {
      sortOrder = { rating: -1 };
    } else if (sort === "popular") {
      sortOrder = { reviewCount: -1 };
    }

    const products = await Product.find(query)
      .sort(sortOrder)
      .limit(100)
      .populate("category");

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Search failed" },
      { status: 500 }
    );
  }
}
