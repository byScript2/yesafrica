import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";
import Media from "@/app/components/models/Media";

export async function POST(req: Request) {
  try {
    await connection();
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    if (tokenUser.role < 1)
      return new NextResponse(JSON.stringify({ message: "Not allowed" }), {
        status: 401,
      });
    const body = await req.json();

    const data = await new Media(body).save();
    return new NextResponse(JSON.stringify(data), {
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

    const data = await Media.find().sort({ _id: -1 });

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
};
