import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.parse(body);

    await connectDB();

    const user = await User.findOne({ email: parsed.email });

    // Always return success for security
    if (!user) {
      return NextResponse.json(
        { message: "If email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // TODO: Generate reset token and send email
    // For now, just return success

    return NextResponse.json(
      { message: "Reset link sent to email" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Request failed" },
      { status: 500 }
    );
  }
}
