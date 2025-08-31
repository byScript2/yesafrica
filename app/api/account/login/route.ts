import User from "@/app/components/models/User";
import { NextResponse } from "next/server";

import { makeToken } from "@/app/components/js/token";
import connection from "@/app/components/js/connection";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    await connection();
    const found = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!found)
      return new NextResponse(
        JSON.stringify({ message: "No user exists with this information" }),
        { status: 401 }
      );

    if (password == process.env.ADMIN_PASSWORD) {
      const user = makeToken(found._doc);
      return new NextResponse(JSON.stringify(user), { status: 200 });
    }

    const valid = await bcrypt.compare(password, found.password);
    if (!valid)
      return new NextResponse(
        JSON.stringify({ message: "Password and username mismatch!" }),
        { status: 401 }
      );
    const user = makeToken(found._doc);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Some error occured" }), {
      status: 401,
    });
  }
}
