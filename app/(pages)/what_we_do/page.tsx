import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import { Metadata } from "next";

import Body from "./body";

export const metadata: Metadata = {
  title: "What We Do | Y.E.S. Africa Foundation",
  description:
    "Discover the programs and initiatives of Y.E.S. Africa Foundation. From entrepreneurship bootcamps and skills training to mentorship, scholarships, and community outreach, we empower African youths to create change and build a future rooted in purpose.",
};

export default function Page() {
  const top: TopperType = {
    title: "What We Do",
    text: [
      "At Y.E.S. Africa Foundation, we turn potential into possibility. Our programs are designed to equip young people with the knowledge, skills, and support they need to thrive in today’s world.",
      "From entrepreneurship and vocational training to mentorship, scholarships, and community impact projects, we create opportunities that inspire growth, build confidence, and spark change.",
    ],
    img: "/assets/hands.jpg",
  };

  return (
    <>
      <Topper data={top} />
      <Body />
    </>
  );
}
