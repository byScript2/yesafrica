"use client";

import styles from "./reach.module.scss";

import { useSlideUp } from "../useslider";

export default function Reach() {
  useSlideUp(["values"]);

  const whoWeServe: { title: string; text: string }[] = [
    {
      title: "Students",
      text: "We support secondary and university students with access to learning resources, scholarships, mentorship, and career guidance to help them unlock their full academic and personal potential.",
    },
    {
      title: "Young Entrepreneurs",
      text: "We empower aspiring and early-stage entrepreneurs with training, startup incubation, and financial literacy programmes, helping them turn ideas into impactful businesses.",
    },
    {
      title: "Innovators & Tech Enthusiasts",
      text: "From coders to creators, we provide opportunities for young minds passionate about technology, digital skills, and innovation to thrive in the global digital economy.",
    },
    {
      title: "Creative Minds",
      text: "We serve young people in music, art, film, design, and media by providing exposure, platforms, and skills that enable them to turn creativity into meaningful careers.",
    },
    {
      title: "Job Seekers & Graduates",
      text: "We equip recent graduates and job seekers with employability skills, mentorship, and opportunities that bridge the gap between education and employment.",
    },
    {
      title: "Community Change-Makers",
      text: "We believe in youth who are passionate about giving back. We support young leaders, activists, and volunteers who are committed to creating social impact in their communities.",
    },
  ];

  return (
    <div className={styles.main}>
      <h1>{`Who We Serve`}</h1>
      <div className={styles.values} id="values">
        {whoWeServe.map((e, i) => (
          <div className={styles.value} key={i}>
            <p className={styles.title}>{e.title}</p>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
