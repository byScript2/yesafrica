"use client";
import { MediaResponseType } from "@/app/components/js/dataTypes";
import styles from "./styles.module.scss";
import { useState } from "react";
import { FILETYPES } from "@/app/components/js/config";
import GoogleVideoCase, {
  ImageCase,
  YoutubeVideoCase,
} from "@/app/components/js/video/video";

export default function Body({ media }: { media: MediaResponseType[] }) {
  const [format, setFormat] = useState(FILETYPES[0]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h1>Media Type</h1>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          {FILETYPES.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.grid}>
        {media
          .filter((e) => e.type == format)
          .map((e, i) => (
            <div
              key={i}
              className={`${styles.item} ${
                e.orientation == "LANDSCAPE"
                  ? styles.landscape
                  : e.orientation == "PORTRAIT"
                  ? styles.portrait
                  : ""
              }`}
            >
              {e.type == "IMAGE" ? (
                <ImageCase
                  src={e.src}
                  orientation={e.orientation}
                  title={e.title}
                  text={e.desc}
                />
              ) : e.source == "YOUTUBE" ? (
                <YoutubeVideoCase
                  src={e.src}
                  orientation={e.orientation}
                  title={e.title}
                  text={e.desc}
                />
              ) : (
                <GoogleVideoCase
                  src={e.src}
                  orientation={e.orientation}
                  title={e.title}
                  text={e.desc}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
