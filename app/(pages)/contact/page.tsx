import { COMPANYNAME } from "@/app/components/js/config";
import { Metadata } from "next";
import Body from "./body";
export const metadata: Metadata = {
  title: `Get Help | ${COMPANYNAME}`,
  description: `Do you have any questions about ${COMPANYNAME}? This page is for answers.`,
};
export default function Help() {
  return <Body />;
}
