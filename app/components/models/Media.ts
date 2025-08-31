import mongoose from "mongoose";
import { MediaResponseType } from "../js/dataTypes";

const media = new mongoose.Schema<MediaResponseType>(
  {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["PDF", "IMAGE", "VIDEO"],
    },
    source: {
      type: String,
      default: "SITE",
      enum: ["SITE", "YOUTUBE", "OTHERS"],
    },
    orientation: {
      type: String,
      required: true,
      enum: ["PORTRAIT", "LANDSCAPE"],
    },
  },
  { timestamps: true }
);

const Media = mongoose.models.Media || mongoose.model("Media", media);
export default Media;
