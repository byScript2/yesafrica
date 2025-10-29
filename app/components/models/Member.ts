import mongoose from "mongoose";
import { MemberResponseType } from "../js/dataTypes";

const member = new mongoose.Schema<MemberResponseType>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    tel: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Volunteer",
      required: true,
    },
    gender: {
      type: Number,
      enum: [1, 0],
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },

    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model("Member", member);
export default Member;
