import { connectDB } from "@/lib/db/mongodb";
import { Order } from "@/models/order";
import { Coupon } from "@/models/coupon";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    await connectDB();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // Verify Razorpay signature
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    const body_data = razorpayOrderId + "|" + razorpayPaymentId;
    const expected_signature = crypto
      .createHmac("sha256", key_secret)
      .update(body_data)
      .digest("hex");

    if (expected_signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Update order status
    order.paymentStatus = "completed";
    order.orderStatus = "completed";
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();

    // Update coupon usage
    if (order.coupon) {
      await Coupon.updateOne(
        { code: order.coupon },
        { $inc: { currentUses: 1 } }
      );
    }

    return NextResponse.json({ message: "Payment verified", order });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
