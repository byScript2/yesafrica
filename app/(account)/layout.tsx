import { ReactNode } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

import { COMPANYNAME } from "../components/js/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign in to your account - ${COMPANYNAME}`,
};
export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.box}>
      <div className={styles.main}>
        <div className={styles.top}>
          <Link href={"/"} className={styles.left}>
            <div className={styles.img}>
              <Image src={"/logo.png"} fill alt="" />
            </div>
          </Link>

          <div className={styles.right}>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About Us</Link>
            <Link href={"/terms"}>Terms</Link>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
