import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";
import Exchanges from "@/models/Exchanges";
import Deposit from "@/models/Deposit";

export async function GET(request, { params }) {
  const { id } = await params;
  // const body = await request.json();

  //fetch
  try {
    await connect();

    const depositDetail = await Deposit.findById(id);

    return NextResponse.json({ depositDetail }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  const body = await request.json();

  //fetch
  try {
    await connect();

    await Deposit.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "Updated Successfully" }, { status: 201 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  //fetch
  const { id } = await params;

  try {
    await connect();

    await Deposit.findByIdAndDelete(id);

    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
