"use client";

import {
  BlogResponseType,
  EventResponseType,
} from "@/app/components/js/dataTypes";
import styles from "./dashboard.module.scss";
import Link from "next/link";

export default function Body({
  events,
  blog,
}: {
  events: EventResponseType[];
  blog: BlogResponseType[];
}) {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.top}>
          <h1>Blog</h1>
        </div>
        <div className={styles.grid}>
          {blog.slice(0, 6).map((e, i) => (
            <div key={i} className={styles.item}>
              <p className={styles.title}>{e.title}</p>
              <Link href={`/dashboard/blog/${e._id}`} className="action">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Events</h1>
        </div>
        <div className={styles.grid}>
          {events.slice(0, 6).map((e, i) => (
            <div key={i} className={styles.item}>
              <p className={styles.title}>{e.title}</p>
              <Link href={`/dashboard/events/${e._id}`} className="action">
                Edit
              </Link>
              <Link
                href={`/dashboard/events/${e._id}/attendees`}
                className="action"
              >
                Attendees
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
