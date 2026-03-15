import { Metadata } from "next";
import Carousel from "../components/js/carousel/Carousel";

import Map from "../components/js/map/map";
import { COMPANYNAME, eventUrl } from "../components/js/config";

import AboutSection from "../components/js/about/about";

import Reach from "../components/js/reach/reach";
import ImportantLinks from "../components/js/important/important";
import { Reasons } from "../components/js/keys/keys";

import Portfolio from "../components/js/portfolio/portfolio";
import { getRequest } from "../components/js/api_client";
import { EventResponseType } from "../components/js/dataTypes";
import Slider from "../components/js/slider/Carousel";

export const metadata: Metadata = {
  title: `${COMPANYNAME} | Welcome to the official website of ${COMPANYNAME}.`,
};
const fetchData = async () => {
  const { data } = await getRequest(eventUrl);

  return data;
};

export const revalidate = 10;
export default async function Home() {
  const data = await fetchData();
  const date = Date.now();
  const up = data.filter((e: EventResponseType) => e.date > date);

  return (
    <div>
      <Carousel />
      {up.length > 0 && (
        <Slider events={up.length == 1 ? [...up, ...up] : up} />
      )}
      <AboutSection />
      <Reasons />
      <Portfolio />

      <Reach />

      <ImportantLinks />

      <Map />
    </div>
  );
}
