import Link from "next/link";
import styles from "./styles.module.scss";

import { IconType } from "react-icons";
import {
  FaDonate,
  FaHandshake,
  FaHandsHelping,
  FaHeart,
  FaUserFriends,
} from "react-icons/fa";
export default function Body() {
  const getInvolved: {
    title: string;
    Icon: IconType;
    text: string;
    link: string;
  }[] = [
    {
      title: "Become a Volunteer",
      Icon: FaHandsHelping,
      text: "Join our network of passionate volunteers and contribute your time, skills, and energy to empower young people across Africa.",
      link: "/get_involved/volunteer",
    },
    {
      title: "Sponsor a Youth Program",
      Icon: FaDonate,
      text: "Directly support youth through scholarships, training, and entrepreneurship programs that transform lives and communities.",
      link: "/get_involved/sponsor",
    },
    {
      title: "Partner on a Project",
      Icon: FaHandshake,
      text: "Collaborate with us to amplify impact through joint initiatives, events, and programs that drive sustainable development.",
      link: "/get_involved/partner",
    },
    {
      title: "Mentor Young People",
      Icon: FaUserFriends,
      text: "Guide and inspire the next generation of leaders by sharing your knowledge, experience, and expertise through mentorship.",
      link: "/get_involved/mentor",
    },
    {
      title: "Donate Now",
      Icon: FaHeart,
      text: "Make a difference with your giving. Every donation helps us reach more youths with life-changing opportunities.",
      link: "/get_involved/donate",
    },
  ];

  return (
    <div className={styles.main}>
      <h2>Ways to get involved</h2>
      <div className={styles.items} id="slide">
        {getInvolved.map((e, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.icon}>
              <e.Icon />
            </div>
            <p className={styles.title}>{e.title}</p>
            <p>{e.text}</p>
            <Link className="action" href={e.link}>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
