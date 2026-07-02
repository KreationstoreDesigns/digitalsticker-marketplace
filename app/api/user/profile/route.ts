import { connectDB } from "@/lib/db/mongodb";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}
