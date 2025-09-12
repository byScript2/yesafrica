"use client";
import { BlogResponseType } from "@/app/components/js/dataTypes";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import Paginate from "@/app/components/js/pager/Paginate";
import Image from "next/image";
import Link from "next/link";
export default function Body({ data }: { data: BlogResponseType[] }) {
  const [pageBlog, setPageBlog] = useState(data);
  return (
    <div className={styles.main}>
      <div className={styles.grid}>
        {pageBlog.map((e) => (
          <Link key={e._id} className={styles.item} href={`/blog/${e._id}`}>
            <div className={styles.image}>
              <Image src={e.banner} alt={e.title} fill />
            </div>
            <div className={styles.text}>
              <p className={styles.title}>{e.title}</p>
              <p>{e.desc}</p>
              <span className="action">Continue reading...</span>
            </div>
          </Link>
        ))}
      </div>
      <Paginate
        data={data}
        setData={setPageBlog as Dispatch<SetStateAction<unknown[]>>}
      />
    </div>
  );
}
