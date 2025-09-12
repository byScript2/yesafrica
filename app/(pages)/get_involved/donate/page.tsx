import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
import Body from "./body";

export default function Page() {
  const top: TopperType = {
    title: "Donate",
    text: [
      "Every donation fuels opportunities for education, skills training, and entrepreneurship that empower young people to thrive.",
      "No amount is too small — together, we can build a future where no youth is left behind.",
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
