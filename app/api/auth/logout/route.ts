import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieOptions = {
      maxAge: 0,
      path: "/",
    };

    cookies().set("token", "", cookieOptions);
    cookies().set("userData", "", cookieOptions);
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
