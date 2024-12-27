import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Deposit from "@/models/Deposit";

export const GET = async (request) => {
  // const url = new URL(request.url);

  // const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    const depositDetails = await Deposit.find().lean();
    return NextResponse.json({ depositDetails }, { status: 200 });
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
    const newDepositDetail = new Deposit(body);

    await newDepositDetail.save();

    return NextResponse.json(
      { message: "Details Saved" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
