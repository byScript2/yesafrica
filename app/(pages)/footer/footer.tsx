"use client";
import Link from "next/link";
import styles from "./footer.module.scss";

import { COMPANYNAME, SOCIALS } from "@/app/components/js/config";
import Image from "next/image";
interface Link {
  name: string;
  link: string;
}

const Footer: React.FC = () => {
  const links: Link[] = [
    {
      name: "Become a Member",
      link: "/membership",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "What We Do",
      link: "/what_we_do",
    },
    {
      name: "Get Involved",
      link: "/get_involved",
    },
    {
      name: "Events",
      link: "/events",
    },

    {
      name: "Donations",
      link: "/get_involved/donate",
    },
    {
      name: "Disclaimer",
      link: "/disclaimer",
    },

    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms & Conditions", link: "/terms" },

    {
      name: "Contact",
      link: "/contact",
    },
  ];
  const date = new Date();
  return (
    <footer className={styles.box}>
      <div className={styles.footer}>
        <div className={styles.left}>
          <Image src={"/logo.png"} alt="Logo" fill />
        </div>
        <div className={styles.right}>
          <div>
            {links.map((subLink, index) => {
              return (
                <Link href={subLink.link} key={index}>
                  {subLink.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.end}>
        <div className={styles.socials}>
          {SOCIALS.map((e, i) => (
            <Link
              href={e.link}
              key={i}
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <e.Icon />
            </Link>
          ))}
        </div>
        <span>{`Copyright © ${date.getFullYear()} ${COMPANYNAME}.`}</span>
      </div>
    </footer>
  );
};

export default Footer;
