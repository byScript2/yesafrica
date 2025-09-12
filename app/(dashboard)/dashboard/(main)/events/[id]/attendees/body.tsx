"use client";

import styles from "./styles.module.scss";

import { AttendeeResponseType } from "@/app/components/js/dataTypes";

import { InputElement } from "../../../utilities";
import { useState } from "react";
import Image from "next/image";

export default function Body({ data }: { data: AttendeeResponseType[] }) {
  const [idNo, setIdNo] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h1>Confirmed registrations</h1>
        <InputElement setter={setIdNo} value={idNo} title="Enter ID No" />
      </div>
      <div className={styles.grid}>
        {data
          .filter((e) => e.idNo.includes(idNo))
          .map((e) => (
            <div key={e._id} className={styles.item}>
              <div className={styles.image}>
                <Image src={e.image} alt={e.name} fill />
              </div>
              <div className={styles.texts}>
                <Text name="ID Number" value={e.idNo} />
                <Text name="Name" value={e.name} />
                <Text name="Tel" value={e.tel} />
                <Text name="Email" value={e.email} />
                <Text name="Role" value={e.role} />

                <Text name="Event Name" value={e.event.title} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Text({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.title}>{`${name}`}</span>
      <span>{value}</span>
    </div>
  );
}
