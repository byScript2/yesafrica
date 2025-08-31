import mongoose from "mongoose";
import { DonationResponseType } from "../js/dataTypes";

const donation = new mongoose.Schema<DonationResponseType>(
  {
    name: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Donation =
  mongoose.models.Donation || mongoose.model("Donation", donation);
export default Donation;
