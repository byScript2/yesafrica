import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "Partner With Us",
    text: [
      "Collaboration creates greater impact. By partnering with Y.E.S. Africa Foundation, you help expand access to programs that equip youth with skills, mentorship, and opportunities.",
      "Together, we can scale change and build sustainable solutions.",
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
