"use client";

import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "./styles.module.scss";
import { useSlideUp } from "@/app/components/js/useslider";
import Image from "next/image";
import Link from "next/link";
export default function Body() {
  const whatWeDo: { title: string; image: string; text: string }[] = [
    {
      title: "Entrepreneurship Development",
      image: "/assets/entrepreneurship.jpg",
      text: "We train and mentor aspiring young entrepreneurs with the business knowledge, tools, and funding support they need to launch and scale up their ventures.",
    },
    {
      title: "Vocational Training",
      image: "/assets/tech.png",
      text: "We provide practical, hands-on training in a variety of fields, including technology skills such as coding and digital marketing, as well as creative trades like tailoring, baking, and photography. Our goal is to equip individuals with the skills needed for job creation and self-reliance.",
    },
    {
      title: "Mentorship & Leadership Development",
      image: "/assets/boss.jpg",
      text: "Our leadership circles connect youth with accomplished mentors across different sectors to help shape character, build confidence, and instill strong values.",
    },
    {
      title: "Scholarship & Academic Support",
      image: "/assets/graduate.jpg",
      text: "We provide scholarships, learning materials, and career guidance to support youth across the continent in their educational journey.",
    },
    {
      title: "Community Outreach & Volunteering",
      image: "/assets/smiles.png",
      text: "We encourage active citizenship through volunteer initiatives, outreach programs, and social impact campaigns that promote unity and empathy.",
    },
  ];

  useSlideUp(["slide"]);
  return (
    <div className={styles.main}>
      <div className={styles.items} id="slide">
        {whatWeDo.map((e, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.image}>
              <Image src={e.image} fill alt={`${e.title}`} />
            </div>
            <div className={styles.text}>
              <div className={styles.heading}>
                <p className={styles.title}>{e.title}</p>
                {i % 2 == 0 ? (
                  <Underline2
                    id={`${e.title.split(" ")[0].toLowerCase()}${i}`}
                  />
                ) : (
                  <Underline
                    id={`${e.title.split(" ")[0].toLowerCase()}${i}`}
                  />
                )}
              </div>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.involved}>
        <h1>Take Action Now</h1>
        <p>
          {`We believe that youth empowerment is a
collective mission. Whether you're an individual, organization, or institution, there’s a role for you in
shaping the next generation of leaders, innovators, and changemakers.`}{" "}
        </p>
        <p>
          {`When you `}{" "}
          <Link href={"/get_involved/donate"} className="color">
            donate
          </Link>
          {`, you help us reach more young people with skills aquisition, mentorship, and access to
life-changing opportunities.`}
        </p>
        <p>
          {`When you`}{" "}
          <Link href={"/get_involved/volunteer"} className="color">
            volunteer
          </Link>
          {`, you give your time, energy, and expertise to nurture hope and unlock potential.
When you partner, you amplify our impact and help us scale meaningful, community-based solutions.`}
        </p>
        <Link className={"action"} href={"/get_involved"}>
          Learn More
        </Link>
      </div>
    </div>
  );
}
