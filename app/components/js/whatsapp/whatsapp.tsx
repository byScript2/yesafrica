"use client";
import { BsWhatsapp } from "react-icons/bs";
import styles from "./whatsapp.module.scss";
import { TEL } from "../config";
import { useEffect } from "react";

export default function Whatsapp() {
  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      const top =
        document.querySelector("body")?.getBoundingClientRect().top || 0;
      const whatsapp = document.querySelector("#whatsapp") as HTMLDivElement;

      if (top * -1 > 200) {
        whatsapp.style.left = "-50%";
      } else {
        whatsapp.style.left = "2.5%";
      }
    });
    window.removeEventListener("scroll", () => {
      return listener;
    });
  }, []);
  return (
    <a
      className={styles.whatsapp}
      href={`https://wa.me/${TEL.replaceAll(" ", "").replaceAll("+", "")}`}
      target={"_blank"}
      rel="noreferrer noopener"
      id="whatsapp"
    >
      <BsWhatsapp />
    </a>
  );
}
