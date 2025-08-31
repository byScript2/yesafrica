"use client";
import Link from "next/link";
import styles from "./footer.module.scss";

import { COMPANYNAME } from "@/app/components/js/config";
import Image from "next/image";
interface Link {
  name: string;
  link: string;
}

const Footer: React.FC = () => {
  const links: Link[] = [
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
      link: "/donation",
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
    <footer className={styles.footer}>
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
        <div>
          <span>
            {`All materials on this site Copyright © ${date.getFullYear()} ${COMPANYNAME}.`}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
