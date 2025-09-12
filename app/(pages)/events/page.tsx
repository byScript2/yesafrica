import { getRequest } from "@/app/components/js/api_client";

import Body from "./body";
import { eventUrl } from "@/app/components/js/config";
import { Metadata } from "next";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
const fetchData = async () => {
  const { data } = await getRequest(eventUrl);

  return data;
};

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Events Events | Y.E.S. Africa Foundation",
  description:
    "Explore upcoming programs, workshops, and initiatives by Y.E.S. Africa Foundation. Join us in empowering youth through impactful events that drive change and create opportunities.",
};

export default async function Page() {
  const data = await fetchData();

  const top: TopperType = {
    title: "Our Events",
    text: [
      "At Y.E.S. Africa Foundation, our events are more than gatherings — they are platforms for learning, collaboration, and transformation. From bootcamps and trainings to outreach and mentorship programs, every event is designed to inspire, equip, and empower young people to achieve their fullest potential.",
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
