import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";
import Users from "@/models/Users";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  //fetch
  try {
    await connect();

    if (email === process.env.NEXT_PUBLIC_MAIL_CHECK) {
      const users = await Users.find();

      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }

  return NextResponse.json({ message: "Unauthorised access" }, { status: 401 });
};

export const POST = async (request) => {
  const body = await request.json();

  // console.log(body);

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
