"use client";
import { IconType } from "react-icons";

import styles from "./keys.module.scss";
import {
  FaHandsHelping,
  FaLightbulb,
  FaUsers,
  FaGlobeAfrica,
} from "react-icons/fa";
import { useSlider } from "../useslider";

export function Reasons() {
  const reasons: { title: string; text: string; Icon: IconType }[] = [
    {
      title: "Youth-Centred Approach",
      text: "Everything we do is designed by and for young people. We listen, we engage, and we build programs that reflect the real needs of African youth.",
      Icon: FaUsers,
    },
    {
      title: "Innovation-Driven Solutions",
      text: "We don’t recycle old methods — we create fresh, practical, and innovative ways to empower youth in education, entrepreneurship, and leadership.",
      Icon: FaLightbulb,
    },
    {
      title: "Impact You Can See",
      text: "Our results speak louder than words — thousands of youths empowered, trained, and mentored across multiple communities in Africa.",
      Icon: FaGlobeAfrica,
    },
    {
      title: "Community of Support",
      text: "With mentors, volunteers, and partners working hand in hand, we provide a strong network that helps young people rise and thrive together.",
      Icon: FaHandsHelping,
    },
  ];

  useSlider(["box"]);
  return (
    <div className={styles.reasons}>
      <div className={styles.box} id="box">
        {reasons.map((e, i) => (
          <div key={i} className={styles.reason}>
            <div className={styles.icon}>
              <e.Icon />
            </div>
            <div className={styles.text}>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
