import {
  createUser,
  getUserByEmail,
} from "@/app/backend/controllers/userController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    // validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser?.email) {
      return NextResponse.json(
        { message: "User already exists", existingUser },
        { status: 400 }
      );
    }

    // create user
    if (!existingUser?.email) {
      const registerUser = await createUser(name, email, password);
      const data = registerUser.toObject();

      return NextResponse.json(
        { message: "User created successfully", data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
