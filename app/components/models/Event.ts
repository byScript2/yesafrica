import mongoose from "mongoose";
import { EventResponseType } from "../js/dataTypes";

const event = new mongoose.Schema<EventResponseType>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },
    date: {
      type: Number,
      required: true,
    },
    regCloseDate: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000000,
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", event);
export default Event;
