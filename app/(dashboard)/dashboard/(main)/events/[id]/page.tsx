import handleProtected from "@/app/components/js/reuseables";

import { eventUrl } from "@/app/components/js/config";
import { getRequest } from "@/app/components/js/api_client";
import { redirect } from "next/navigation";
import Body from "./body";

const fetchData = async (token: string, id: string) => {
  const { data } = await getRequest(`${eventUrl}${id}`, token);
  return data;
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const token = await handleProtected(true);
  const data = await fetchData(token, params.id);
  if (!data) redirect("/dashboard/events");
  return <Body data={data} />;
}
