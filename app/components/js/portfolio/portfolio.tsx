"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useSlideUp } from "../useslider";
import { Underline2 } from "../underline/underline";

export default function Portfolio() {
  const content: {
    title: string;
    text: string[];
    img: string;
    id: string;
  }[] = [
    {
      title: "Education & Research",
      text: [
        "We equip young people with access to quality education, scholarships, digital literacy, and mentorship. By bridging the knowledge gap, we prepare the next generation of innovators, leaders, and problem-solvers to thrive in a fast-changing world.",
        "Our goal is to create equal opportunities for learning, ensuring that no youth is left behind due to socio-economic limitations.",
      ],
      img: "/assets/graduate.jpg",
      id: "education",
    },
    {
      title: "Entrepreneurship & Business",
      text: [
        "We believe in the power of enterprise to change lives. Through startup incubation, business training, and financial literacy programmes, we help young entrepreneurs transform ideas into thriving businesses that create jobs and drive economic growth.",
        "By connecting youths with mentors and investors, we nurture bold thinkers who will shape Africa’s economic future.",
      ],
      img: "/assets/entrepreneurship.jpg",
      id: "entrepreneurship",
    },
    {
      title: "Technology & Innovation",
      text: [
        "Technology is the backbone of the future, and we ensure young people are not left behind. From coding bootcamps to Web3 and AI awareness, we empower youths to harness innovation, solve problems creatively, and compete globally in the digital economy.",
        "We encourage innovation challenges and hackathons that spark creativity and position African youths as global contributors in tech.",
      ],
      img: "/assets/technology.jpg",
      id: "technology",
    },
    {
      title: "Creative Arts & Media",
      text: [
        "Africa’s creativity is unmatched, and we channel that energy into opportunities for the youth. Whether in music, film, design, or digital media, we provide platforms, training, and exposure for young creatives to tell their stories and showcase their talent.",
        "By investing in arts and media, we empower youths to transform passion into sustainable careers while amplifying Africa’s voice on the global stage.",
      ],
      img: "/assets/creative.jpg",
      id: "creative",
    },

    {
      title: "Health & Wellbeing",
      text: [
        "A strong mind and body are essential for a thriving generation. We support health awareness, mental wellbeing initiatives, and career opportunities in healthcare, ensuring young people are fit, confident, and capable of building the Africa of tomorrow.",
        "From community outreach programmes to skills training in health-related fields, we are committed to creating healthier societies.",
      ],
      img: "/assets/health.jpg",
      id: "health",
    },
  ];

  useSlideUp(["gridlist"]);
  return (
    <div className={styles.sectors}>
      <div className={styles.top}>
        <div className={styles.heading} id="portfolio">
          <h1> Building Youth Potential Across Sectors</h1>
          <Underline2 id="portfolio" />
        </div>
      </div>
      <div className={styles.grid} id="gridlist">
        {content.map((e, i) => (
          <div className={styles.item} key={i} id={e.id}>
            <div className={styles.text}>
              <h2>{e.title}</h2>
              {e.text.map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </div>
            <div className={styles.img}>
              <Image src={e.img} alt={e.title} fill />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
