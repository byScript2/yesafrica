import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import verifyToken, { makeToken } from "@/app/components/js/token";
import Member from "@/app/components/models/Member";

export const PUT = async (
  req: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    await connection();
    const bodyRequest = await req.json();
    const tokenUser = verifyToken(req.headers.get("token") || "");
    const body = bodyRequest;
    const _id = params.id;

    const changeUser = await Member.findByIdAndUpdate(
      tokenUser.role > 0 ? _id : tokenUser._id,
      { $set: body },
      {
        new: true,
      }
    );

    return new NextResponse(JSON.stringify(changeUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

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

    const tokenUser = verifyToken(req.headers.get("token") || "");
    if (tokenUser.role < 1 && params.id != tokenUser._id) throw new Error();

    const data = await Member.findById(params.id);

    return new NextResponse(JSON.stringify(data), {
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

    await Member.findByIdAndDelete(params.id);

    return new NextResponse(JSON.stringify({ message: "Success!" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "failed" }), {
      status: 401,
    });
  }
};
