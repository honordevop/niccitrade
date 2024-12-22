import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Address from "@/models/Address";

export async function GET(request, { params }) {
  // Wait for params to resolve before destructuring
  const { id } = await params; // Await params

  try {
    await connect(); // Connect to the database

    // Fetch the address by ID
    const address = await Address.findById(id);

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    // Handle error
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
  const { id } = await params;

  const body = await request.json();

  console.log(`${id} ${body}`)

  //fetch
  try {
    await connect();

    await Address.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "Address Updated" }, { status: 201 });
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

    await Address.findByIdAndDelete(id);

    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
