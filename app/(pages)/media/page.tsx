import { getRequest } from "@/app/components/js/api_client";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
import { mediaUrl } from "@/app/components/js/config";

import Body from "./body";

const fetchData = async () => {
  const { data } = await getRequest(mediaUrl);

  return data;
};

export const revalidate = 10;

export default async function Page() {
  const media = await fetchData();
  const top: TopperType = {
    title: "Moments That Inspire",
    text: [
      "Our media and gallery page captures the energy, passion, and impact of Y.E.S. Africa Foundation in action. From vibrant events and training sessions to community outreach and success stories, each image and video reflects the spirit of youth empowerment and transformation.",
      "Take a glimpse into the journeys we share with young people across Africa — stories of growth, innovation, and purpose coming to life.",
    ],
    img: "/assets/health.jpg",
  };

  return (
    <>
      <Topper data={top} />
      <Body media={media} />
    </>
  );
}
