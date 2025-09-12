import { NextResponse } from "next/server";

import axios from "axios";
import Event from "@/app/components/models/Event";
import Attendee from "@/app/components/models/Attendee";
import { EventResponseType } from "@/app/components/js/dataTypes";
import { makeId, makePaymentToken } from "@/app/components/js/token";
import { EMAIL } from "@/app/components/js/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, tel, purpose, amount: rawAmount, name, eventId } = body;
    let amount = rawAmount;
    if (amount <= 0) throw new Error();
    let details = { name, tel, purpose, amount, email: email || EMAIL };
    if (eventId) {
      const now = new Date().getTime();
      const event = (await Event.findOne({
        _id: eventId,
        regCloseDate: { $gte: now },
      })) as EventResponseType;

      const attendees = await Attendee.find({ eventId });
      const exists = attendees.find((e) => e.email == body.email);
      if (exists) {
        return new NextResponse(
          JSON.stringify({
            message: "You have already registered for this event",
            url: "",
          }),
          {
            status: 401,
          }
        );
      }
      if (attendees.length >= event.max || !event)
        return new NextResponse(
          JSON.stringify({
            message: "Registration closed!",

            url: "",
          }),
          {
            status: 401,
          }
        );

      amount = event.fee;
      const idNo = makeId(event.title);
      body.idNo = idNo;
      body.reference = idNo;
      const up = await new Attendee(body);
      details = { ...up._doc, amount };
    }

    const hashed = makePaymentToken(details);

    const callback_url = `${process.env.NEXT_PUBLIC_SERVER_URL}payment/?xop=${hashed}`;
    const centage = 0.015;
    const fee = Math.round(
      amount < 2500
        ? amount * centage
        : amount * centage + 100 > 2000
        ? 2000
        : amount * centage + 100
    );

    const { data } = await axios.post(
      `${process.env.PAYSTACK_URL}initialize`,
      {
        email: details.email,
        amount: (amount + fee) * 100,
        callback_url,
        currency: "NGN",
        pass_charge: true,
        initiate_type: "inline",
        metadata: {
          custom_fields: [
            {
              display_name: "Phone Number",
              variable_name: "Phone Number",
              value: tel,
            },
            {
              display_name: "Name",
              variable_name: "Name",
              value: name,
            },
            {
              display_name: "Email",
              variable_name: "Email",
              value: details.email,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
        },
      }
    );

    return new NextResponse(
      JSON.stringify({
        data: details,
        url: data.data.authorization_url,
        message: "success",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        message: "failed",
        data: {},
        url: "",
      }),
      {
        status: 401,
      }
    );
  }
}
