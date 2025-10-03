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
