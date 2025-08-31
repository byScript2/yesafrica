import connection from "@/app/components/js/connection";
import User from "@/app/components/models/User";
import { NextResponse } from "next/server";
import verifyToken, { makeToken } from "@/app/components/js/token";
import bcrypt from "bcryptjs";

export const PUT = async (
  req: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    await connection();
    const bodyRequest = await req.json();
    const tokenUser = verifyToken(req.headers.get("token") || "");
    const { email, role, password, ...body } = bodyRequest;
    const _id = params.id;
    const admin = tokenUser.role == 2;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      body.password = hash;
    }
    if (admin && typeof role === "number" && Number.isFinite(role)) {
      body.role = role;
    }

    const changeUser = await User.findByIdAndUpdate(
      admin ? _id : tokenUser._id,
      { $set: body },
      {
        new: true,
      }
    );

    const uzer = makeToken(changeUser._doc);

    return new NextResponse(JSON.stringify(uzer), {
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

    const data = await User.findById(params.id);

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

    await User.findByIdAndDelete(params.id);

    return new NextResponse(JSON.stringify({ message: "Success!" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "failed" }), {
      status: 401,
    });
  }
};
