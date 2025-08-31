import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";
import Event from "@/app/components/models/Event";

export async function POST(req: Request) {
  try {
    await connection();
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    if (tokenUser.role < 1)
      return new NextResponse(JSON.stringify({ message: "Not allowed" }), {
        status: 401,
      });
    const body = await req.json();

    const event = await new Event(body).save();
    return new NextResponse(JSON.stringify(event), {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
}

export const GET = async (req: Request) => {
  try {
    await connection();

    const events = await Event.find().sort({ date: -1 });

    return new NextResponse(JSON.stringify(events), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
};
