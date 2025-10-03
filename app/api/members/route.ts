import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";

import Member from "@/app/components/models/Member";
import sendMail from "@/app/components/js/sendMail";
import { MembershipMessage } from "@/app/components/js/emails";

export const GET = async (req: Request) => {
  try {
    await connection();
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (tokenUser.role < 1) throw new Error();
    if (email) {
      const users = await Member.aggregate([
        {
          $match: {
            email: {
              $regex: email,
              $options: "i",
            },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);
      return new NextResponse(JSON.stringify(users), {
        status: 200,
      });
    }

    const users = await Member.find().sort({ _id: -1 });

    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
};

export async function POST(req: Request) {
  try {
    await connection();

    const body = await req.json();
    const member = await new Member(body).save();
    await sendMail(MembershipMessage(member._doc));
    return new NextResponse(JSON.stringify({ message: "Created" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
}
