import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";

export const GET = async (request) => {
  

  //fetch
  try {
    await connect();

    const invoices = await Invoice.find().lean();
    return NextResponse.json({ invoices }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};


