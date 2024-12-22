import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Money from "@/models/Money";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    const moneyRecord = await Money.find(email && { email }).lean();
    return NextResponse.json({ moneyRecord }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};


