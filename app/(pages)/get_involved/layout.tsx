import Map from "@/app/components/js/map/map";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Get Involved | Y.E.S. Africa Foundation",
  description:
    "Join Y.E.S. Africa Foundation in empowering young people across Africa. Volunteer, mentor, sponsor a program, partner with us, or donate to create lasting impact and shape the next generation of leaders.",
};

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Map />
    </>
  );
}
