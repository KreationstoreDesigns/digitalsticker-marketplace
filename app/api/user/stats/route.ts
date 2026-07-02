import { connectDB } from "@/lib/db/mongodb";
import { Order } from "@/models/order";
import { Download } from "@/models/download";
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

    const orders = await Order.find({
      user: session.user.id,
      paymentStatus: "completed",
    });

    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const downloadCount = await Download.countDocuments({ user: session.user.id });

    return NextResponse.json({
      stats: {
        totalOrders,
        totalSpent,
        downloadCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
