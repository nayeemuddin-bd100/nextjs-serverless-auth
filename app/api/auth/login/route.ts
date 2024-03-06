import {
  createToken,
  getUserByEmail,
  verifyPassword,
} from "@/app/backend/controllers/userController";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // validate inputs
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // check if password is correct
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // create jwt token
    const token = createToken(user);
    const cookieOptions = {
      maxAge: 60 * 60, // 1 hour
      path: "/",
    };
    const userData = user.toObject();

    // set user data into cookie
    cookies().set("token", token, cookieOptions);
    cookies().set("userData", JSON.stringify(userData), cookieOptions);

    return NextResponse.json(
      { message: "Login successful", data: { ...userData, token } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
