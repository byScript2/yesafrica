"use client";
import Image from "next/image";
import styles from "./video.module.scss";
import { useEffect } from "react";
export default function GoogleVideoCase({
  src: sr,
  title,
  text,
  orientation,
}: {
  src: string;
  title?: string;
  text?: string;
  orientation: "PORTRAIT" | "LANDSCAPE" | "SQUARE";
}) {
  const src = sr.replace("/view?usp=sharing", "/preview");
  useEffect(() => {
    const parent = document.getElementById(src);
    const video = parent?.querySelector(".video");
    const options: IntersectionObserverInit = {
      threshold: 0.1,
    };
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLVideoElement;
          target.src = src;
          observer.unobserve(entry.target);
        }
      });
    };
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    if (video) observer.observe(video);
  }, [src]);

  return (
    <div className={styles.main} id={src}>
      {title && <p>{title}</p>}
      {text && <p>{text}</p>}

      <iframe
        className={`video ${styles.video} ${
          orientation == "LANDSCAPE"
            ? styles.landscape
            : orientation == "PORTRAIT"
            ? styles.portrait
            : ""
        }`}
        src={""}
        aria-describedby={src}
        title="Google video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
export function YoutubeVideoCase({
  src: sr,
  title,
  text,
  orientation,
}: {
  src: string;
  title?: string;
  text?: string;
  orientation: "PORTRAIT" | "LANDSCAPE" | "SQUARE";
}) {
  const VIDEO_ID = sr.split(".be/")[1];
  const src = `https://www.youtube.com/embed/${VIDEO_ID}`;
  useEffect(() => {
    const parent = document.getElementById(src);
    const video = parent?.querySelector(".video");
    const options: IntersectionObserverInit = {
      threshold: 0.1,
    };
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLVideoElement;
          target.src = src;
          observer.unobserve(entry.target);
        }
      });
    };
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    if (video) observer.observe(video);
  }, [src]);

  return (
    <div className={styles.main} id={src}>
      {title && <p>{title}</p>}
      {text && <p>{text}</p>}

      <iframe
        className={`video ${styles.video} ${
          orientation == "LANDSCAPE"
            ? styles.landscape
            : orientation == "PORTRAIT"
            ? styles.portrait
            : ""
        }`}
        src={""}
        aria-describedby={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
export function ImageCase({
  src,
  title,
  text,
  orientation,
}: {
  src: string;
  title?: string;
  text?: string;
  orientation: "PORTRAIT" | "LANDSCAPE" | "SQUARE";
}) {
  return (
    <div className={`${styles.main} ${styles.box}`} id={src}>
      {(title || text) && (
        <div className={styles.text}>
          {title && <p>{title}</p>}
          {text && <p>{text}</p>}
        </div>
      )}

      <div
        className={`${styles.image} ${
          orientation == "LANDSCAPE"
            ? styles.landscape
            : orientation == "PORTRAIT"
            ? styles.portrait
            : ""
        }`}
      >
        <Image src={src} alt={""} fill />
      </div>
    </div>
  );
}
export function VideoCase2({
  src,
  title,
  text,
}: {
  src: string;
  title: string;
  text?: string;
}) {
  useEffect(() => {
    const parent = document.getElementById(src);
    const video = parent?.querySelector(".video");
    const options: IntersectionObserverInit = {
      threshold: 0.1,
    };
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLVideoElement;
          target.src = src;
          observer.unobserve(entry.target);
        }
      });
    };
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    if (video) observer.observe(video);
  }, [src]);

  return (
    <div className={styles.main} id={src}>
      <p>{title}</p>
      {text && <p>{text}</p>}

      <video
        className={`video ${styles.video}`}
        src={""}
        controls
        aria-describedby={src}
        title={title}
      />
    </div>
  );
}
