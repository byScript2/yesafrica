import connection from "@/app/components/js/connection";
import User from "@/app/components/models/User";
import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";
import bcrypt from "bcryptjs";

export const GET = async (req: Request) => {
  try {
    await connection();
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (tokenUser.role < 1) throw new Error();
    if (email) {
      const users = await User.aggregate([
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

    const users = await User.find().sort({ _id: -1 });

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
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    if (tokenUser.role < 1)
      return new NextResponse(JSON.stringify({ message: "Not allowed" }), {
        status: 401,
      });
    const body = await req.json();
    const { password } = body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    body.password = hash;
    await new User(body).save();
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
