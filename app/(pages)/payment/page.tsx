import { postRequest } from "@/app/components/js/api_client";
import { attendeeUrl, donationUrl } from "@/app/components/js/config";
import connection from "@/app/components/js/connection";

import { verifyPaymentToken } from "@/app/components/js/token";

import axios from "axios";
import { redirect } from "next/navigation";

async function handleDetails(reference: string, xop: string) {
  try {
    const details = verifyPaymentToken(xop);
    const amount = details.amount * 100;
    const { data } = await axios.get(
      `${process.env.PAYSTACK_URL}verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
        },
      }
    );

    if (!data.status || data.data.amount < amount)
      throw new Error("Invalid payment");
    await connection();
    details.reference = reference;
    const { success } = details.eventId
      ? await postRequest(attendeeUrl, details)
      : await postRequest(donationUrl, details);
    const message = details.eventId
      ? "Your registration has been confirmed, and a confirmation email has been sent to you."
      : `Thank you for donating to our foundation.`;
    return { message, status: 1 };
  } catch (error) {
    const message = `There was a problem with this payment.`;
    return { message, status: 0 };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ reference: string; xop: string }>;
}) {
  const { reference, xop } = await searchParams;
  const { message, status } = await handleDetails(reference, xop);
  redirect(`/thanks?message=${message}&status=${status}`);
}
