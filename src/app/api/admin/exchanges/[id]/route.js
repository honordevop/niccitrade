import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";
import Exchanges from "@/models/Exchanges";

export async function GET(request, { params }) {
  const { id } = await params;
  // const body = await request.json();

  //fetch
  try {
    await connect();

    const exchange = await Exchanges.findById(id);

    return NextResponse.json({ exchange }, { status: 200 });
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

    await Exchanges.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "Exchange Updated" }, { status: 201 });
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

    await Exchanges.findByIdAndDelete(id);

    return NextResponse.json({ message: "Exchange deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
