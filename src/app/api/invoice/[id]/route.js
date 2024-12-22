import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";

export async function GET(request, { params }) {
  const { id } = await params;
  // const body = await request.json();

  //fetch
  try {
    await connect();

    const invoice = await Invoice.findById(id);

    return NextResponse.json({ invoice }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;

  const body = await request.json();

  //fetch
  try {
    await connect();

    await Invoice.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "Invoice Updated" }, { status: 201 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  //fetch
  const { id } = params;

  try {
    await connect();

    await Invoice.findByIdAndDelete(id);

    return NextResponse.json({ message: "Invoice deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
