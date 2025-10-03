import Body from "./body";
import { Metadata } from "next";
import { COMPANYNAME } from "@/app/components/js/config";
export const metadata: Metadata = {
  title: `Become a member | ${COMPANYNAME}`,
};
export default async function Account() {
  return <Body />;
}
