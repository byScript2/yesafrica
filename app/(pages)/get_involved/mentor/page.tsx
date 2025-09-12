import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "Mentor Young People",
    text: [
      "Share your knowledge, skills, and experience with young people who need guidance to grow. As a mentor, you become a role model, offering support that shapes futures and inspires confidence.",
      "Your story can light the way for the next generation of leaders.",
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
