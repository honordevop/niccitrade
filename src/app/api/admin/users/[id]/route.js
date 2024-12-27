import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Invoice from "@/models/Invoice";
import Users from "@/models/Users";
import Money from "@/models/Money";

export async function GET(request, { params }) {
  const { id } = await params;
  // const body = await request.json();

  //fetch
  try {
    await connect();

    const user = await Users.findById(id);

    return NextResponse.json({ user }, { status: 200 });
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

    await Users.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "User Updated" }, { status: 201 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    // Find the user by ID to get the email
    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { email } = user;

    // Perform deletions
    await Users.findByIdAndDelete(id);
    await Money.findOneAndDelete({ email });
    await Invoice.findOneAndDelete({ email });

    return NextResponse.json({ message: "User and associated records deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error", error: error.message }, { status: 500 });
  }
};

