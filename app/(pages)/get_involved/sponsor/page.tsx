import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "Sponsor a Program",
    text: [
      "Turn dreams into reality by sponsoring a youth program. Your support provides scholarships, skills training, and entrepreneurship opportunities for young Africans.",
      "Invest in a future full of purpose, passion, and impact.",
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
