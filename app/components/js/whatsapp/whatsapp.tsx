import { BsWhatsapp } from "react-icons/bs";
import styles from "./whatsapp.module.scss";
import { TEL } from "../config";

export default function Whatsapp() {
  return (
    <a
      className={styles.whatsapp}
      href={`https://wa.me/${TEL.replaceAll(" ", "").replaceAll("+", "")}`}
      target={"_blank"}
      rel="noreferrer noopener"
    >
      <BsWhatsapp />
    </a>
  );
}
