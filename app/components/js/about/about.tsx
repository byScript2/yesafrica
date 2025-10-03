"use client";
import Image from "next/image";
import styles from "./about.module.scss";
import Link from "next/link";
import Underline from "../underline/underline";

export default function AboutSection() {
  return (
    <div className={styles.about}>
      <div className={styles.image}>
        <Image src={"/assets/makeup.png"} fill alt="" />
      </div>
      <div className={styles.text}>
        <div className={styles.heading}>
          <h1>A Future Rooted in Purpose</h1>
          <Underline id="menksshsh" />
        </div>
        <p>{`Welcome to Y.E.S. Africa Foundation — the home of bold ideas, big dreams, and unstoppable young people.`}</p>
        <p>{`We believe youths aren’t just the leaders of tomorrow — you are the movers, builders, and changemakers of today. That’s why we exist: to fuel your journey with education, mentorship, entrepreneurship, and hands-on skills that actually open doors.`}</p>
        <p>{`This isn’t just a foundation — it’s a movement. A space where passion meets purpose, where creativity sparks innovation, and where African youth rise together to shape a future we can all be proud of.`}</p>

        <div className={styles.actions}>
          <Link href={"/membership"} className="action">
            Become a member →
          </Link>
          <Link href={"/about"} className="action">
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  );
}
