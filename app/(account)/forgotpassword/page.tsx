import { handleAuthorization } from "@/app/components/js/reuseables";
import Body from "./body";
import { Metadata } from "next";
import { COMPANYNAME } from "@/app/components/js/config";
export const metadata: Metadata = {
  title: `Forgot Password | ${COMPANYNAME}`,
};
export default async function Account() {
  await handleAuthorization();
  return <Body />;
}
