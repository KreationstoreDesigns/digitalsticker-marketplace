import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { hashPassword } from "@/utils/password";
import { registerSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    await connectDB();

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const user = new User({
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
    });

    await user.save();

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
