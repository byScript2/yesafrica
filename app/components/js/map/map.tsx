"use client";
import { useEffect } from "react";
import styles from "./map.module.scss";
import { HQ } from "../config";
const Map: React.FC = () => {
  let done = false;
  useEffect(() => {
    if (!done) {
      const cont = document.getElementById("cont");
      const frame = document.createElement("iframe");
      frame.id = "gmap_canvas";
      frame.src = `https://maps.google.com/maps?q=${HQ}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
      frame.width = "100%";
      frame.height = "100%";
      cont?.appendChild(frame);
      done = true;
    }
  }, []);
  return (
    <div className="mapouter">
      <div className={styles.map} id="cont"></div>
    </div>
  );
};

export default Map;
