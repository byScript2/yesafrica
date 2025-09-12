import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "Be a Part of the Change",
    text: [
      "At Y.E.S. Africa Foundation, we believe real change happens when passionate people come together. Every hand, every skill, and every contribution matters.",
      "Whether you choose to volunteer, mentor, sponsor, partner, or donate, your support helps us empower young Africans with opportunities that shape their future.",
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
