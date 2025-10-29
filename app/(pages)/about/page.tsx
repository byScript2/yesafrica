import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
import styles from "./styles.module.scss";
import { Metadata } from "next";

import Map from "@/app/components/js/map/map";

import Image from "next/image";
import { COMPANYNAME } from "@/app/components/js/config";
import { Underline2 } from "@/app/components/js/underline/underline";
import CoreValues from "./values";

export const metadata: Metadata = {
  title: "About Us | Y.E.S. Africa Foundation",
  description:
    "Y.E.S. Africa Foundation is a youth-focused non-profit empowering African youths through education, entrepreneurship, mentorship, and skills acquisition. Learn more about our mission, vision, and values.",
};

export default function About() {
  const top: TopperType = {
    title: "Y.E.S. Africa Foundation",
    text: [
      "Y.E.S. Africa Foundation is more than an NGO, we are a movement dedicated to unlocking the potential of Africa’s young people.",
      "Through education, entrepreneurship, mentorship, and skills acquisition, we empower youths to rise with purpose, passion, and impact.",
    ],
    img: "/assets/jump.jpg",
  };

  return (
    <>
      <Topper data={top} />
      <div className={styles.about}>
        <div className={styles.intro}>
          <div className={styles.left}>
            <div className={styles.heading}>
              <h1>Who We Are</h1>
              <Underline2 id="whoweare" />
            </div>
            <p>{`YES Africa Foundation is a youth-focused non-profit organization dedicated to the empowerment and holistic
development of young people across Africa.`}</p>
            <p>{`Founded on the belief that every young person deserves access to opportunity, we serve as a bridge between
potential and possibility, helping youth gain the tools, skills, networks, and support they need to thrive.`}</p>
            <p>{`Through our targeted programs and strategic partnerships, we create platforms for entrepreneurship,
leadership development, digital literacy, mental wellness, and civic engagement.`}</p>
            <p>{`Our work is driven by passion, rooted in integrity, and committed to impact.`}</p>
          </div>
          <div className={styles.right}>
            <div className={styles.group}>
              <h2>Our Mission</h2>
              <p>{`To unlock the potential of young people by providing them with access to quality education, practical
skills, mentorship, and growth opportunities that foster innovation, entrepreneurship, and leadership.`}</p>
            </div>
            <div className={styles.group}>
              <h2>Our Vision</h2>
              <p>{`To build a generation of empowered, purpose-driven youth who are equipped to lead change and drive
sustainable development in Africa.`}</p>
            </div>
          </div>
        </div>

        <CoreValues />
        <div className={styles.ceo}>
          <div className={styles.person}>
            <Image
              src={"/assets/ceo.jpeg"}
              alt={`Founder of ${COMPANYNAME}`}
              fill
            />
          </div>
          <div className={styles.text}>
            <h2>Leadership with Purpose</h2>
            <p>{`Evans Edozie Onyeakor is an accomplished entrepreneur, investor, and business coach with over 25 years of experience building and scaling successful ventures across diverse industries, including manufacturing, real estate, and international trade. Over the years, he has developed a reputation for transforming startups into sustainable enterprises, guiding them from the ground up to achieve remarkable growth and stability.`}</p>
            <p>{`As a visionary leader, Evans combines strategic thinking with deep operational knowledge, allowing him to navigate complex business environments and unlock opportunities others might overlook. His passion for business development and financial empowerment has positioned him as a trusted advisor to individuals, startups, and established organisations seeking practical pathways to growth.`}</p>
            <p>{`Beyond the boardroom, Evans is the founder of the Y.E.S. Africa Foundation, a platform dedicated to equipping young Africans with education, entrepreneurial skills, and mentorship opportunities. Through this work, he has impacted countless lives, advancing inclusive development and inspiring a generation to embrace leadership and innovation.`}</p>
            <p>{`Respected for his authentic leadership style and unwavering commitment to excellence, Evans continues to mentor and inspire the next generation of African entrepreneurs, leaving a legacy rooted in purpose, impact, and service to humanity.`}</p>
          </div>
        </div>
      </div>
      <Map />
    </>
  );
}
