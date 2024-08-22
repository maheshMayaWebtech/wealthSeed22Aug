import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import LoginMain from "../../../../models/LoginMain";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { oldPassword, newPassword } = await request.json();
    const user = await LoginMain.findOne({ password: oldPassword });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== oldPassword) {
      return NextResponse.json(
        { message: "Old password does not match" },
        { status: 401 }
      );
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
