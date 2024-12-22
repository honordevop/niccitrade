import Users from "@/models/Users";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Money from "@/models/Money";

export const POST = async (request) => {
  const {
    fullname,
    email,
    password,
    mobilenumber,
  } = await request.json();

  // const initializeMoneyRecord = [
  //   { money: { currency: "BTC(USD)", amount: "0.00", email: email } },
  // { money: { currency: "USDT-TRC20", amount: "0.00", email: email } },
  // { money: { currency: "TRON", amount: "0.00", email: email } },
  // { money: { currency: "NGN", amount: "0.00", email: email } },
  // ]

const initializeMoneyRecord = {
  email: email,
  moneyrecord: [
    { currency: "BTC(USD)", amount: "0.00" },
    { currency: "USDT-TRC20", amount: "0.00" },
    { currency: "TRON", amount: "0.00" },
    { currency: "NGN", amount: "0.00" },
  ],
};


  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new Users({
    fullname,
    email,
    mobilenumber,
    password: hashedPassword,
  });


  try {
    const user = await Users.findOne({
      email: email,
    });
    if (user) {
      return NextResponse.json(
        { message: "Account already exist" },
        { status: 500 }
      );
    }
    await newUser.save();

    // Create initial money record for new user
    try {
      // await Money.create(initializeMoneyRecord);

      const moneyRecord = new Money(initializeMoneyRecord);
      await moneyRecord.save();

    } catch (err) {
      console.error("Error inserting money records:", err.message);
      await Users.deleteOne({ email }); // Rollback user creation
      return NextResponse.json(
        { message: "Failed to initialize money records. Account creation rolled back." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Account Created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
};

export const GET = async (request) => {
  const url = new URL(request.url);

  //fetch
  try {
    await connect();

    // const users = await Users.find();
    const users = await Users.find().select("-password");


    // (username && { username }))
    // .reverse()
    // .slice(0, 4);

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
