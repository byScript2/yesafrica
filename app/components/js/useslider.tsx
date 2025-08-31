"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

const getElements = (ids: string[]) => {
  const parentArray: HTMLDivElement[] = [];
  ids.forEach((id) => {
    const parent = document.querySelector(`#${id}`) as HTMLDivElement;
    const divChildren: HTMLCollection = parent?.children || [];
    for (let i = 0; i < divChildren.length; i++) {
      const el = divChildren.item(i) as HTMLDivElement;
      parentArray.push(el);
    }
  });
  return parentArray;
};
const getIndElements = (ids: string[]) => {
  const parentArray: HTMLDivElement[] = [];
  ids.forEach((id) => {
    const element = document.querySelector(`#${id}`) as HTMLDivElement;
    parentArray.push(element);
  });
  return parentArray;
};

export const useClass = (
  groups: {
    id: string;
    setter: Dispatch<SetStateAction<boolean>>;
  }[]
) => {
  useEffect(() => {
    const ids = groups.map((e) => e.id);
    const parentArray = getIndElements(ids);
    const options = {
      threshold: 1,
    };
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        const id = target.id;
        const group = groups.find((e) => e.id == id);
        if (entry.isIntersecting) {
          group?.setter(true);
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [groups]);
};
export const useFixedPosition = (
  groups: {
    id: string;
    childId: string;
    position: { top: string; left: string };
  }[]
) => {
  useEffect(() => {
    const ids = groups.map((e) => e.id);
    const parentArray = getIndElements(ids);
    const options = {
      threshold: 0.23,
    };
    const callback = (
      entries: IntersectionObserverEntry[]
      // observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        const id = target.id;
        const group = groups.find((e) => e.id == id)!;
        const child = document.getElementById(group!.childId) as HTMLDivElement;

        if (target.clientWidth >= 800) {
          if (entry.isIntersecting) {
            child.style.position = "fixed";
            child.style.top = group.position.top;
            child.style.left = group.position.left;
            target.style.alignItems = "flex-end";
          } else {
            child.style.position = "relative";
            child.style.top = "unset";
            child.style.left = "unset";
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
};
export const useNumbering = (
  groups: {
    id: string;
    qty: number;
    time: number;
  }[]
) => {
  useEffect(() => {
    const ids = groups.map((e) => e.id);
    const parentArray = getIndElements(ids);
    const options = {
      threshold: 1,
    };
    function runTimer(element: HTMLHeadingElement) {
      const id = element.id;
      const group = groups.find((e) => e.id == id);
      if (!group?.qty || !group?.time) return;
      let i = 0;
      const time = Math.round(group.time);
      const reading = setInterval(() => {
        i += 1;
        element.textContent = `${i}`;
        if (i >= group.qty) clearInterval(reading);
      }, time);
    }
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLHeadingElement;
        if (entry.isIntersecting) {
          runTimer(target);
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [groups]);
};
export const useWidth = (
  groups: {
    id: string;
    width: string;
    maxWidth: string;
  }[]
) => {
  useEffect(() => {
    const ids = groups.map((e) => e.id);
    const parentArray = getIndElements(ids);
    const options = {
      threshold: 0.3,
    };
    const width = document.body.clientWidth;
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        target.style.transition = "1.5s";
        const found = groups.find((e) => e.id == target.id)!;
        if (width >= 800) {
          if (entry.isIntersecting) {
            target.style.width = found.width;
          } else {
            target.style.width = found.maxWidth;
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [groups]);
};
export const useSlider = (ids: string[]) => {
  useEffect(() => {
    //strings to id
    const parentArray = getElements(ids);
    const options = {
      threshold: 0.2,
    };
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry, index) => {
        const target = entry.target as HTMLDivElement;
        if (entry.isIntersecting) {
          target.style.transform = "translate(0,0) ";
          target.style.opacity = "1";

          observer.unobserve(entry.target);
        } else {
          target.style.transform =
            index % 2 === 0 ? "translate(-30%, 10%)" : "translate(30%, 10%)";
          target.style.opacity = "0";
          target.style.transition = "0.75s";
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [ids]);
};

export const useSlideUp = (ids: string[]) => {
  useEffect(() => {
    const parentArray = getElements(ids);

    const options = {
      threshold: 0.2,
    };
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry, index) => {
        const target = entry.target as HTMLDivElement;

        if (entry.isIntersecting) {
          target.style.transform = "translateY(0%) ";
          target.style.opacity = "1";

          observer.unobserve(entry.target);
        } else {
          target.style.transform =
            index % 2 === 0 ? "translateY(15%)" : "translateY(30%)";
          target.style.opacity = "0";
          target.style.transition = "0.75s";
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    parentArray.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [ids]);
};
