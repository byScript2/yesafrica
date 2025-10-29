"use client";
import styles from "./Nav.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import Translator from "@/app/components/js/translate/Translator";

import { COMPANYNAME } from "@/app/components/js/config";
import { RiAccountCircle2Line } from "react-icons/ri";
import { useUserContext } from "@/app/components/js/Wrapper";

interface LinkType {
  text: string;
  link: string;
}

const Nav: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const { user } = useUserContext();
  const centerLinks: LinkType[] = [
    {
      text: "About Us",
      link: "/about",
    },
    {
      text: "Our programs",
      link: "/programs",
    },
    {
      text: "Get Involved",
      link: "/get_involved",
    },

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
  ];

  useEffect(() => {
    const toggleShow = () => {
      const anchor = document.querySelectorAll("a");
      const body = document.querySelector("body");

      if ((body?.getBoundingClientRect().width || 1000) <= 800) {
        setMobile(true);
      }
      anchor.forEach((a) => {
        a.addEventListener("click", () => {
          setShow(false);
        });
      });
    };
    return toggleShow();
  }, []);
  useEffect(() => {
    const handler = () => {
      const body = document.querySelector("body");
      const top = body?.getBoundingClientRect().top || 0;

      if (top < -300) setScrolled(true);
      else {
        setScrolled(false);
      }
    };
    const scroller = document.addEventListener("scroll", (e) => handler());
    return document.removeEventListener("scroll", () => scroller);
  }, []);

  return (
    <div className={styles.box}>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.desktop}>
          <div className={styles.top}>
            <Link href={"/membership"}>
              <span>Become a member</span>
            </Link>
            {user?.email ? (
              <Link href={"/dashboard"}>
                <RiAccountCircle2Line className={styles.icon} />
                <span>Account</span>
              </Link>
            ) : (
              <Link href={"/login"}>
                <span>Staff</span>
              </Link>
            )}
            <Link href={"/contact"}>
              <span>Contact Us</span>
            </Link>
            {!mobile && (
              <span className={styles.icon}>
                <Translator />
              </span>
            )}
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <Link href={"/"} className={styles.logo}>
                <Image src={"/logo.png"} fill alt={COMPANYNAME} />
              </Link>
            </div>
            <div className={styles.right}>
              <ul className={styles.otherLinks}>
                {centerLinks.map((parent, i) => (
                  <li key={i}>
                    <Link href={parent.link}>
                      <span className={styles.title}>{parent.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.mobile}>
          <div className={styles.left}>
            <Link href={"/"} className={styles.logo}>
              <Image src={"/logo.png"} fill alt={COMPANYNAME} />
            </Link>

            <div className={styles.menuIcon} onClick={() => setShow(!show)}>
              {show ? (
                <AiOutlineClose className={styles.icon} />
              ) : (
                <HiOutlineMenuAlt4 className={styles.icon} />
              )}
            </div>
          </div>
          <div
            className={
              show
                ? `${styles.right} ${styles.show}`
                : `${styles.right} ${styles.hide}`
            }
          >
            <div className={styles.top}>
              <Link href={"/membership"} style={{ color: "var(--a)" }}>
                <span>Become a member</span>
              </Link>
              {user?.email ? (
                <Link href={"/dashboard"}>
                  <RiAccountCircle2Line className={styles.icon} />
                  <span>Account</span>
                </Link>
              ) : (
                <Link href={"/login"}>
                  <span>Staff</span>
                </Link>
              )}
              <Link href={"/contact"}>
                <span>Contact Us</span>
              </Link>

              {mobile && (
                <span className={styles.icon}>
                  <Translator />
                </span>
              )}
            </div>
            <div className={styles.bottom}>
              <ul className={styles.otherLinks}>
                {centerLinks.map((parent, i) => (
                  <li key={i}>
                    <Link href={parent.link}>
                      <span className={styles.title}>{parent.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
