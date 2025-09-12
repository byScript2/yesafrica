import handleProtected from "@/app/components/js/reuseables";

import { getRequest } from "@/app/components/js/api_client";

import { Body } from "./body";
import { donationUrl } from "@/app/components/js/config";
const fetchData = async (token: string) => {
  const { data } = await getRequest(donationUrl, token);

  return data;
};

export default async function Page() {
  const token = await handleProtected(true);
  const donations = await fetchData(token);
  return <Body donations={donations} />;
}
