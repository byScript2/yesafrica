import Image from "next/image";
import styles from "./important.module.scss";
import Link from "next/link";

import { FaRegCircleRight } from "react-icons/fa6";

export default function ImportantLinks() {
  const links: { text: string; link: string }[] = [
    {
      text: "Blog",
      link: "/blog",
    },
    {
      text: "Events",
      link: "/events",
    },
    {
      text: "Media",
      link: "/media",
    },

    {
      text: "Donate",
      link: "/donation",
    },
    {
      text: "Get Involved",
      link: "/get_involved",
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.links}>
        <span className={styles.title}>Important links</span>
        {links.map((e, i) => (
          <Link href={e.link} className={styles.link} key={i}>
            <span>{e.text}</span>
            <FaRegCircleRight className={styles.icon} />
          </Link>
        ))}
      </div>

      <div className={styles.image}>
        <Image src={"/assets/boss.jpg"} fill alt="" />
      </div>
    </div>
  );
}
