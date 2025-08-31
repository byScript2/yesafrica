import mongoose from "mongoose";
import { UserResponseType } from "../js/dataTypes";

const user = new mongoose.Schema<UserResponseType>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    oNames: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", user);
export default User;
