import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";
import Blog from "@/app/components/models/Blog";
import User from "@/app/components/models/User";
import {
  BlogResponseType,
  UserResponseType,
} from "@/app/components/js/dataTypes";

export async function POST(req: Request) {
  try {
    await connection();
    const tokenUser = verifyToken(`${req.headers.get("token")}`);
    if (tokenUser.role < 1)
      return new NextResponse(JSON.stringify({ message: "Not allowed" }), {
        status: 401,
      });
    const body = await req.json();
    body.authorId = tokenUser._id;
    const data = await new Blog(body).save();
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

    const data = (await Blog.find().sort({ _id: -1 })) as {
      _doc: BlogResponseType;
    }[];
    const users = (await User.find({
      _id: { $in: data.map((e) => e._doc.authorId) },
    })) as UserResponseType[];
    const formatted = data.map((e, i) => {
      const author = users.find((k) => k._id == e._doc.authorId);
      return { ...e._doc, author };
    });

    return new NextResponse(JSON.stringify(formatted), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Failed" }), {
      status: 401,
    });
  }
};
