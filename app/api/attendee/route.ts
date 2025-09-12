import connection from "@/app/components/js/connection";

import { NextResponse } from "next/server";
import { makeId } from "@/app/components/js/token";
import Attendee from "@/app/components/models/Attendee";
import Event from "@/app/components/models/Event";
import {
  AttendeeResponseType,
  EventResponseType,
} from "@/app/components/js/dataTypes";
import sendMail from "@/app/components/js/sendMail";
import { RegistrationMessage } from "@/app/components/js/emails";

export async function POST(req: Request) {
  try {
    await connection();
    const body = await req.json();
    const event = (await Event.findById(body.eventId)) as EventResponseType;

    if (event.fee == 0) {
      const now = new Date().getTime();
      const attendees = (await Attendee.find({
        eventId: body.eventId,
      })) as AttendeeResponseType[];
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
      if (attendees.length >= event.max || event.regCloseDate < now)
        return new NextResponse(
          JSON.stringify({
            message: "Registration closed!",
            url: "",
          }),
          {
            status: 401,
          }
        );

      const idNo = makeId(event.title);
      body.idNo = idNo;
      body.reference = idNo;
    }

    const data = await new Attendee(body).save();
    await sendMail(RegistrationMessage(data, event));
    return new NextResponse(JSON.stringify(data), {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        message: "Registration closed!",

        url: "",
      }),
      {
        status: 401,
      }
    );
  }
}

export const GET = async (req: Request) => {
  try {
    await connection();
    const url = new URL(req.url);
    const idNo = url.searchParams.get("idNo");
    const eventId = url.searchParams.get("eventId");

    const data = eventId
      ? await Attendee.find({ eventId }).sort({ _id: -1 })
      : idNo
      ? await Attendee.find({ idNo })
      : await Attendee.find().sort({ _id: -1 });
    const events = await Event.find({
      _id: { $in: data.map((e) => e._doc.eventId) },
    });
    const formatted = data.map((e: { _doc: AttendeeResponseType }) => {
      const event = events.find((k) => k._id == e._doc.eventId);
      return { ...e._doc, event };
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
