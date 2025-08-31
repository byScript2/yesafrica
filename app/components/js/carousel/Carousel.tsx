"use client";
import Image from "next/image";

import styles from "./Carousel.module.scss";

import { COMPANYNAME } from "../config";

import { useNumbering } from "../useslider";

const Carousel: React.FC = () => {
  const values: {
    title: string;
    value: number;
    initial: string;
  }[] = [
    {
      title: "Youths Empowered",
      value: 50,
      initial: ">126",
    },
    {
      title: "Skills Training & Bootcamps",
      value: 50,
      initial: ">3",
    },
    {
      title: "Active Volunteers",
      value: 60,
      initial: ">",
    },

    {
      title: "Communities Reached",
      value: 45,
      initial: ">",
    },
  ];
  useNumbering(
    values.map((e) => ({
      id: e.title.split(" ")[0],
      qty: e.value,
      time: e.value > 100 ? e.value * 0.1 : e.value,
    }))
  );
  return (
    <div className={styles.cont}>
      <div className={styles.image}>
        <Image src={"/assets/smiles.png"} fill alt="Smiling Youths" />
      </div>
      <div className={styles.texts}>
        <h1>Building Change, One Youth at a Time</h1>
        <div className={styles.grid}>
          {values.map((e, i) => (
            <div key={i}>
              <div className={styles.row}>
                <span className={styles.title}>{e.initial}</span>
                <span
                  className={styles.title}
                  id={e.title.split(" ")[0]}
                ></span>
              </div>
              <span>{e.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export interface TopperType {
  img: string;
  title: string;
  text: string[];
}
interface TopperProp {
  data: TopperType;
}
export const Topper: React.FC<TopperProp> = ({ data }) => {
  return (
    <div className={`${styles.holder} ${styles.topper}`}>
      <div className={`${styles.carousel} ${styles.scrolled} `}>
        <div className={styles.img}>
          <Image src={data.img} fill alt={COMPANYNAME} />
        </div>

        <div className={styles.text}>
          <h1>{data.title}</h1>

          {data.text.map((e, i) => (
            <p className={styles.smText} key={i}>
              {e}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
