import { connectDB } from "@/lib/db/mongodb";
import { Wishlist } from "@/models/wishlist";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let wishlist = await Wishlist.findOne({ user: session.user.id }).populate(
      "products"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: session.user.id,
        products: [],
      });
    }

    return NextResponse.json({ wishlist });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    await connectDB();

    let wishlist = await Wishlist.findOne({ user: session.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: session.user.id,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    return NextResponse.json({ wishlist }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    await connectDB();

    const wishlist = await Wishlist.findOne({ user: session.user.id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    return NextResponse.json({ wishlist });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}
