import { NextResponse } from "next/server";
import connect from "@/Utils/db";
import Money from "@/models/Money";

export async function GET(request, { params }) {
  const { id } = await params;
  // const body = await request.json();

  //fetch
  try {
    await connect();

    const moneyRecord = await Money.findById(id);

    return NextResponse.json({ moneyRecord }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

// export async function PATCH(request, { params }) {
//   const { id } = params;

//   const body = await request.json();

//   //fetch
//   try {
//     await connect();

//     await Invoice.findByIdAndUpdate(id, body);

//     return NextResponse.json({ message: "Invoice Updated" }, { status: 201 });
//   } catch (error) {
//     // console.log(error);
//     return NextResponse.json({ message: "Database Error" }, { status: 500 });
//   }
// }


export const PATCH = async (request, { params }) => {
  const { id } = params; // Correctly extract `id` from params
  const { currency, amount } = await request.json();

  // console.log(`${id} ${currency} ${amount}`)

  try {
    await connect();

    // Update the amount for the specific document and currency
    const updatedRecord = await Money.findOneAndUpdate(
      { _id: id, "moneyrecord.currency": currency }, // Match _id and currency
      { $set: { "moneyrecord.$.amount": amount } }, // Update the amount for the matched currency
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Amount updated successfully", updatedRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Error updating record", error: error.message },
      { status: 500 }
    );
  }
};



export const DELETE = async (request, { params }) => {
  //fetch
  const { id } = params;

  try {
    await connect();

    await Money.findByIdAndDelete(id);

    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
