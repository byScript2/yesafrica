"use client";
import { IconType } from "react-icons";
import {
  FaBalanceScale,
  FaHandshake,
  FaHeart,
  FaLightbulb,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import styles from "./styles.module.scss";
import { useSlideUp } from "@/app/components/js/useslider";
export default function CoreValues() {
  const coreValues: { title: string; Icon: IconType; text: string }[] = [
    {
      title: "Integrity",
      Icon: FaBalanceScale,
      text: "We lead with honesty and transparency, building trust in every action and decision.",
    },
    {
      title: "Excellence",
      Icon: FaStar,
      text: "We strive for the highest standards, inspiring young people to aim higher and achieve more.",
    },
    {
      title: "Innovation",
      Icon: FaLightbulb,
      text: "We embrace creativity and new ideas, helping youths shape solutions for today and tomorrow.",
    },
    {
      title: "Collaboration",
      Icon: FaHandshake,
      text: "We believe in the power of working together, partnering with individuals and organisations to maximise impact.",
    },
    {
      title: "Inclusiveness",
      Icon: FaUsers,
      text: "We create opportunities for every young person, ensuring no voice or talent is left behind.",
    },
    {
      title: "Service to Humanity",
      Icon: FaHeart,
      text: "We put people first, empowering youths to make a difference in their communities and beyond.",
    },
  ];
  useSlideUp(["slide"]);
  return (
    <div className={styles.list}>
      <h2>Our Core Values</h2>
      <div className={styles.items} id="slide">
        {coreValues.map((e, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.icon}>
              <e.Icon />
            </div>
            <p className={styles.title}>{e.title}</p>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
