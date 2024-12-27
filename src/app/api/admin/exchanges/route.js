import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Exchanges from "@/models/Exchanges";

export const GET = async (request) => {
  // const url = new URL(request.url);

  // const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    const exchanges = await Exchanges.find().lean();
    return NextResponse.json({ exchanges }, { status: 200 });
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
    const newExchange = new Exchanges(body);

    await newExchange.save();

    return NextResponse.json(
      { message: "Exchange Saved" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
