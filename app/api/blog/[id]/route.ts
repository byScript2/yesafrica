import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken from "@/app/components/js/token";
import Blog from "@/app/components/models/Blog";
import User from "@/app/components/models/User";

export const PUT = async (
  req: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    await connection();
    const body = await req.json();
    const tokenUser = verifyToken(req.headers.get("token") || "");

    const _id = params.id;
    if (tokenUser.role < 1)
      return new NextResponse(
        JSON.stringify({ message: "Operation not allowed" }),
        {
          status: 401,
        }
      );

    const update = await Blog.findByIdAndUpdate(
      _id,
      { $set: body },
      {
        new: true,
      }
    );

    return new NextResponse(JSON.stringify(update), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "failed" }), {
      status: 401,
    });
  }
};
export const GET = async (
  req: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    await connection();

    const data = await Blog.findById(params.id);
    const author = await User.findById(data.authorId);
    const returnType = { ...data._doc, author };

    return new NextResponse(JSON.stringify(returnType), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "failed" }), {
      status: 401,
    });
  }
};
export const DELETE = async (
  req: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    await connection();

    const tokenUser = verifyToken(req.headers.get("token") || "");
    if (tokenUser.role != 2) throw new Error();

    await Blog.findByIdAndDelete(params.id);

    return new NextResponse(JSON.stringify({ message: "Success!" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "failed" }), {
      status: 401,
    });
  }
};
