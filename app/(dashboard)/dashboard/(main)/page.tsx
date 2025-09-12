import handleProtected from "@/app/components/js/reuseables";

import { getRequest } from "@/app/components/js/api_client";

import Body from "./body";
import { blogUrl, eventUrl } from "@/app/components/js/config";

const getData = async (token: string) => {
  const { data: events, success: good } = await getRequest(eventUrl, token);
  const { data } = await getRequest(blogUrl);

  return {
    events,
    blog: data,
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ vrcToken: string }>;
}) {
  const { vrcToken } = await searchParams;
  const token = await handleProtected(true, vrcToken);
  const { events, blog } = await getData(token);
  return <Body blog={blog} events={events} />;
}
