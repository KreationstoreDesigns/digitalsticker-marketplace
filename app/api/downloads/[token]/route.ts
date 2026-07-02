import { connectDB } from "@/lib/db/mongodb";
import { Download } from "@/models/download";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    await connectDB();

    const download = await Download.findOne({
      downloadToken: params.token,
    });

    if (!download) {
      return NextResponse.json(
        { message: "Download link not found" },
        { status: 404 }
      );
    }

    if (download.isExpired) {
      return NextResponse.json(
        { message: "Download link expired" },
        { status: 410 }
      );
    }

    const now = new Date();
    if (now > download.expiresAt) {
      download.isExpired = true;
      await download.save();
      return NextResponse.json(
        { message: "Download link expired" },
        { status: 410 }
      );
    }

    const product = await Product.findById(download.product);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    download.downloadCount += 1;
    await download.save();

    // Redirect to the actual download URL (Cloudinary or your file storage)
    return NextResponse.redirect(product.downloadUrl);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to process download" },
      { status: 500 }
    );
  }
}
