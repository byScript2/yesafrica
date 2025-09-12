import { getRequest } from "@/app/components/js/api_client";

import Body from "./body";
import { blogUrl } from "@/app/components/js/config";
import { Metadata } from "next";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
const fetchData = async () => {
  const { data } = await getRequest(blogUrl);

  return data;
};

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Blog | YES Africa Foundation",
  description:
    "Explore inspiring stories, lessons, and insights on youth empowerment, entrepreneurship, and resilience. Stay updated with articles that inform, motivate, and spark change.",
};

export default async function Page() {
  const data = await fetchData();

  const top: TopperType = {
    title: "Our Blog",
    text: [
      "Dive into a collection of inspiring stories, thought-provoking insights, and impactful lessons that reflect the journey of empowerment, resilience, and growth. Each post is crafted to spark ideas, share experiences, and motivate you to keep moving forward.",
    ],
    img: "/assets/blog.jpg",
  };

  return (
    <>
      <Topper data={top} />
      <Body data={data} />
    </>
  );
}
