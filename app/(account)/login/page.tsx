import { handleAuthorization } from "@/app/components/js/reuseables";
import Body from "./body";
import { Metadata } from "next";
import { COMPANYNAME } from "@/app/components/js/config";
export const metadata: Metadata = {
  title: `Login | ${COMPANYNAME}`,
};
export default async function Account() {
  await handleAuthorization();
  return <Body />;
}
