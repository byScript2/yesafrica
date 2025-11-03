import { getRequest } from "@/app/components/js/api_client";

import Body from "./body";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { COMPANYNAME, eventUrl, WEBLINK } from "@/app/components/js/config";
import { EventResponseType } from "@/app/components/js/dataTypes";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  const { data } = (await getRequest(`${eventUrl}${id}`)) as {
    data: EventResponseType;
  };
  // const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${data.title} | ${COMPANYNAME}`,
    description: data.desc,

    openGraph: {
      title: `${data.title} | ${COMPANYNAME}`,
      description: data.desc,
      url: WEBLINK,
      images: [{ url: data.banner }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | ${COMPANYNAME}`,
      description: data.desc,
      images: [{ url: data.banner }],
    },
  };
}

const getData = async (id: string) => {
  const { data } = await getRequest(`${eventUrl}${id}`);

  return data;
};

export const revalidate = 10;

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const data = (await getData(id)) as EventResponseType;
  if (!data) redirect("/events");
  const top: TopperType = {
    img: data.banner,
    title: data.title,
    text: [data.desc],
  };
  return (
    <>
      <Topper data={top} />
      <Body data={data} />
    </>
  );
}
