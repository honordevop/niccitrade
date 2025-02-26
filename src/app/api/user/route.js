import { NextResponse } from "next/server";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import connect from "@/Utils/db";
import Otps from "@/models/Otps";

export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  console.log("Received request for email:", email); // ✅ Log the incoming request

  try {
    await connect();
    
    const user = await Users.findOne({ email }).lean();
    
    console.log("Fetched user data from DB:", user); // ✅ Log the user data fetched from MongoDB
    
    if (!user) {
      console.log("User not found for email:", email); // ✅ Log if user is not found
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...userData } = user;
    
    return new Response(JSON.stringify({ user: userData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error); // ✅ Log any database errors
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { email, password } = await request.json();

  console.log("Received password update request for email:", email); // ✅ Log request

  await connect();

  const user = await Users.findOne({ email });

  if (user) {
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      await Users.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );

      console.log("Password updated successfully for email:", email); // ✅ Log password update success
      
      return NextResponse.json(
        { message: "Password Changed successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error updating password:", error); // ✅ Log any database errors
      return NextResponse.json({ message: "Database Error" }, { status: 500 });
    }
  } else {
    console.log("User not found for email:", email); // ✅ Log if user not found
    return new NextResponse("User not found", { status: 404 });
  }
};
