import { connectDB } from "@/lib/db/mongodb";
import { Coupon } from "@/models/coupon";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, amount } = body;

    await connectDB();

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid coupon code" },
        { status: 400 }
      );
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return NextResponse.json(
        { message: "Coupon has expired" },
        { status: 400 }
      );
    }

    if (coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json(
        { message: "Coupon usage limit reached" },
        { status: 400 }
      );
    }

    if (amount < coupon.minOrderAmount!) {
      return NextResponse.json(
        { message: `Minimum order amount is ${coupon.minOrderAmount}` },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (amount * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    return NextResponse.json({ discount, coupon: coupon.code });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
