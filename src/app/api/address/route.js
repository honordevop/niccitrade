import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Address from "@/models/Address";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    const addresses = await Address.find(email && { email }).lean();
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  // console.log(body);

  //fetch
  try {
    await connect();
    const newAddress = new Address(body);

    await newAddress.save();

    return NextResponse.json(
      { message: "Address Saved" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
