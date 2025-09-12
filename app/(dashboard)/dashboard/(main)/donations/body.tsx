"use client";

import styles from "./styles.module.scss";

import { DonationResponseType } from "@/app/components/js/dataTypes";

export function Body({ donations }: { donations: DonationResponseType[] }) {
  return (
    <div className={styles.main}>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Donations</h1>
        </div>
        <div className={styles.grid}>
          {donations.map((e, i) => (
            <div key={i} className={styles.item}>
              <span>{e.name}</span>
              <span>{e.tel}</span>
              <span>{e.purpose}</span>
              <span>
                {e.amount.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
