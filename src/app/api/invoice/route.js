import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";
import Order from "@/models/Order";

export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  try {
    await connect();

    const invoices = await Invoice.find({ email }).lean();
    return NextResponse.json({ invoices }, { status: 200 });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  console.log(body);

  //fetch
  try {
    await connect();
    const newInvoice = new Invoice(body);

    await newInvoice.save();



    return NextResponse.json(
      { message: "Invoice Generated" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
