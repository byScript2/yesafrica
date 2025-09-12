"use client";
import { EventResponseType } from "@/app/components/js/dataTypes";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Paginate from "@/app/components/js/pager/Paginate";
import Image from "next/image";
import Link from "next/link";
export default function Body({ data }: { data: EventResponseType[] }) {
  const [upcoming, setUpcoming] = useState(data);
  const [past, setPast] = useState(data);
  const [pageEvent, setPageEvent] = useState(past);
  useEffect(() => {
    const date = new Date().getTime();
    const up = data.filter((e) => e.date > date);
    const pa = data.filter((e) => e.date <= date);
    setUpcoming(up);
    setPast(pa);
  }, [data]);
  function dateString(e: number) {
    const date = new Date(e);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <div className={styles.main}>
      <div className={styles.group}>
        <h1>Upcoming Events</h1>
        <div className={styles.grid}>
          {upcoming.map((e) => (
            <Link key={e._id} className={styles.item} href={`/events/${e._id}`}>
              <div className={styles.image}>
                <Image src={e.banner} alt={e.title} fill />
              </div>
              <div className={styles.text}>
                <p className="italics">{dateString(e.date)}</p>
                <p className={styles.title}>{e.title}</p>
                <p>{e.desc}</p>
                <span className="action">Continue reading...</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.group}>
        <h1>Past Events</h1>
        <div className={styles.grid}>
          {pageEvent.map((e) => (
            <Link key={e._id} className={styles.item} href={`/events/${e._id}`}>
              <div className={styles.image}>
                <Image src={e.banner} alt={e.title} fill />
              </div>
              <div className={styles.text}>
                <p className="italics">{dateString(e.date)}</p>
                <p className={styles.title}>{e.title}</p>
                <p>{e.desc}</p>
                <span className="action">Continue reading...</span>
              </div>
            </Link>
          ))}
        </div>
        <Paginate
          data={past}
          setData={setPageEvent as Dispatch<SetStateAction<unknown[]>>}
        />
      </div>
    </div>
  );
}
