"use client";
import { ReactNode } from "react";
import styles from "./Box.module.scss";
import Link from "next/link";
import { IconType } from "react-icons/lib";

import { HiOutlineUsers } from "react-icons/hi";

import { CgMail } from "react-icons/cg";

import { MdAccountCircle } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useUserContext } from "@/app/components/js/Wrapper";
import { COMPANYNAME } from "@/app/components/js/config";

import Image from "next/image";

interface LinkProp {
  name: string;
  link: string;
  icon: IconType;
}
const Box: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useUserContext();
  const user = context?.user;
  const logout = context?.logout;
  const adminLinks: LinkProp[] = [
    {
      name: "Users",
      link: "/dashboard/users",
      icon: HiOutlineUsers,
    },
    {
      name: "Events",
      link: "/dashboard/events",
      icon: CgMail,
    },
    {
      name: "Blog",
      link: "/dashboard/blog",
      icon: FaHandHoldingUsd,
    },
    {
      name: "Account",
      link: "/dashboard/account",
      icon: MdAccountCircle,
    },
  ];

  const topLinks: { link: string; name: string }[] = [
    {
      link: "/dashboard/",
      name: "Dashboard",
    },
    {
      link: "/dashboard/media",
      name: "Media",
    },

    {
      link: "/dashboard/donations",
      name: "Donations",
    },
  ];

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div className={styles.first}>
          <Link href={"/"} className={styles.logo}>
            <Image src={"/logo.png"} fill alt="" />
          </Link>
          <h1>{`WELCOME ${user?.name.toUpperCase()}`}</h1>
          <h1>{COMPANYNAME} DASHBAORD</h1>
        </div>

        <div className={styles.last}>
          {topLinks.map((link, i) => (
            <Link href={link.link} key={i}>
              {link.name}
            </Link>
          ))}

          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.children}>{children}</div>
      </div>
      <div className={styles.bottom}>
        {adminLinks.map((link, i) => (
          <Link href={link.link} key={i}>
            <span>{link.name}</span>
            <link.icon className={styles.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Box;
