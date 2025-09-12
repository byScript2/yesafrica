import connection from "@/app/components/js/connection";

import User from "@/app/components/models/User";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { makeToken } from "@/app/components/js/token";

export async function POST(req: Request) {
  try {
    throw new Error();
    await connection();
    const body = await req.json();
    const { password } = body;
    body.role = 0;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    body.password = hash;

    const newUser = await new User(body).save();

    const user = makeToken(newUser._doc);

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
}
