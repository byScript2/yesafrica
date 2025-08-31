import { Metadata } from "next";
import Carousel from "../components/js/carousel/Carousel";

import Map from "../components/js/map/map";
import { COMPANYNAME } from "../components/js/config";

import AboutSection from "../components/js/about/about";

import Reach from "../components/js/reach/reach";
import ImportantLinks from "../components/js/important/important";
import { Reasons } from "../components/js/keys/keys";

import Portfolio from "../components/js/portfolio/portfolio";

export const metadata: Metadata = {
  title: `${COMPANYNAME} | Welcome to the official website of ${COMPANYNAME}.`,
};

export default async function Home() {
  return (
    <div>
      <Carousel />

      <AboutSection />
      <Reasons />
      <Portfolio />

      <Reach />

      <ImportantLinks />

      <Map />
    </div>
  );
}
