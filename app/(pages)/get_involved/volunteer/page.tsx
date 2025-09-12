import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "VOLUNTEER WITH US",
    text: [
      "Join our community of volunteers who are giving their time, skills, and energy to empower the next generation of African leaders.",
      "From outreach to training support, your contribution makes a real impact.",
    ],
    img: "/assets/circle.jpg",
  };

  return (
    <>
      <Topper data={top} />
      <Body />
    </>
  );
}
