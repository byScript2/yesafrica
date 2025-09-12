import { getRequest } from "@/app/components/js/api_client";

import Body from "./body";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { blogUrl, COMPANYNAME } from "@/app/components/js/config";
import { BlogResponseType } from "@/app/components/js/dataTypes";
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

  const { data } = (await getRequest(`${blogUrl}${id}`)) as {
    data: BlogResponseType;
  };
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${data.title} | ${COMPANYNAME}`,
    description: data.desc,

    openGraph: {
      title: `${data.title} | ${COMPANYNAME}`,
      description: data.desc,
      images: [data.banner, ...previousImages],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | ${COMPANYNAME}`,
      description: data.desc,
      images: [data.banner],
    },
  };
}

const getData = async (id: string) => {
  const { data } = await getRequest(`${blogUrl}${id}`);

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
  const data = (await getData(id)) as BlogResponseType;
  if (!data) redirect("/blog");
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
