"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import styles from "./Carousel.module.scss";
import { EventResponseType } from "../dataTypes";

interface Props {
  events: EventResponseType[];
}

export default function Slider({ events }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = events.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = () => {
    setCurrent((c) => (c - 1 + total) % total);
  };

  const goTo = (index: number) => {
    setCurrent(index);
  };

  // Auto-play
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      <div className={styles.track}>
        {events.map((col, i) => {
          const isActive = i === current;
          const isPrev = i === (current - 1 + total) % total;
          const isNext = i === (current + 1) % total;

          return (
            <div
              key={col._id}
              className={`${styles.slide} ${
                isActive ? styles.active : ""
              } ${isPrev ? styles.prev : ""} ${isNext ? styles.next : ""}`}
            >
              {/* Image */}
              <div className={styles.imageWrap}>
                <Image
                  src={col.banner}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className={styles.image}
                  priority={i === 0}
                />
              </div>

              {/* Content */}
              <div className={styles.slideContent}>
                <h3 className={styles.slideName}>{col.title}</h3>
                <p className={styles.slideText}>{col.desc}</p>
                <Link href={`/events/${col._id}`} className={styles.slideLink}>
                  Learn More
                </Link>
                {col.regLink && (
                  <a
                    href={col.regLink}
                    className={styles.slideLink}
                    rel="noreferrer noopener"
                    target={"_blank"}
                  >
                    Register
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Arrows ── */}
      <span
        className={`${styles.arrow} ${styles.arrowLeft} ${!paused ? styles.arrowHide : ""}`}
        onClick={prev}
        aria-label="Previous collection"
      >
        <IoChevronBack size={20} />
      </span>
      <span
        className={`${styles.arrow} ${styles.arrowRight} ${!paused ? styles.arrowHide : ""}`}
        onClick={next}
        aria-label="Next collection"
      >
        <IoChevronForward size={20} />
      </span>

      {/* ── Dots ── */}
      <div className={styles.dots}>
        {events.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ animationPlayState: paused ? "paused" : "running" }}
          key={current}
        />
      </div>
    </div>
  );
}
