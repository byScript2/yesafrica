import mongoose from "mongoose";
import { AttendeeResponseType } from "../js/dataTypes";

const attendee = new mongoose.Schema<AttendeeResponseType>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    idNo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      unique: true,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

const Attendee =
  mongoose.models.Attendee || mongoose.model("Attendee", attendee);
export default Attendee;
