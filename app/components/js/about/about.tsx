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
        <p>{`Welcome to Y.E.S. Africa Foundation — the home of bold ideas, big dreams, and the unstoppable African youth. We believe our youths are not just leaders of tomorrow — they are the movers, builders, and changemakers of today. That’s why we exist: to ignite goal driven passion, creating platforms for development. This is not just a foundation, it is a movement, a space where creativity sparks innovation, and where African youth rise together to shape a bold future.`}</p>

        <div className={styles.actions}>
          <Link href={"/get_involved"} className="action">
            Get involved →
          </Link>
          <Link href={"/about"} className="action">
            About us →
          </Link>
        </div>
      </div>
    </div>
  );
}
