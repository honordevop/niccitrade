import { NextResponse } from "next/server";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import connect from "@/Utils/db";
import Otps from "@/models/Otps";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    const user = await Users.findOne(email && { email }).lean();
    

    const {password, ...userData} = user
    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { email, password } = await request.json();

  // const hashedPassword = await bcrypt.hash(password, 5);

  await connect();

  const user = await Users.findOne({ email });

  // if (otpExist.otp !== otp) {
  //   return NextResponse.json({ message: "Invalid OTP Code" }, { status: 401 });
  // }

  // console.log(user.password);
  //fetch
  if (user) {
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      await Users.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );

      return NextResponse.json(
        { message: "Password Changed succesfully" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ message: "Database Error" }, { status: 500 });
    }
  } else {
    return new NextResponse("User not found", { status: 404 });
  }
};
