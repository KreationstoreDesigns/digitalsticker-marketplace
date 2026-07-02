import { connectDB } from "@/lib/db/mongodb";
import { Order } from "@/models/order";
import { Download } from "@/models/download";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const order = await Order.findById(params.id).populate("items.product");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.user.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (order.paymentStatus !== "completed") {
      return NextResponse.json(
        { message: "Order not paid" },
        { status: 400 }
      );
    }

    const downloads = await Promise.all(
      order.items.map(async (item: any) => {
        let download = await Download.findOne({
          order: order._id,
          product: item.product._id,
        });

        if (!download) {
          const token = generateDownloadToken();
          download = await Download.create({
            user: session.user.id,
            product: item.product._id,
            order: order._id,
            downloadToken: token,
          });
        }

        return {
          productId: item.product._id,
          productName: item.product.name,
          downloadUrl: `/api/downloads/${download.downloadToken}`,
          downloadToken: download.downloadToken,
          expiresAt: download.expiresAt,
        };
      })
    );

    return NextResponse.json({ downloads });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch downloads" },
      { status: 500 }
    );
  }
}
