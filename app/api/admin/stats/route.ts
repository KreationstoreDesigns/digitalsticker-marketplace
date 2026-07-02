import { connectDB } from "@/lib/db/mongodb";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { User } from "@/models/user";
import { Category } from "@/models/category";
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

    const orders = await Order.find({ paymentStatus: "completed" });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();
    const pendingOrders = await Order.countDocuments({
      paymentStatus: "pending",
    });

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCategories,
        totalUsers,
        pendingOrders,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
