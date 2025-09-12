import { BlogResponseType } from "@/app/components/js/dataTypes";
import styles from "../styles.module.scss";
import Image from "next/image";

export default function Body({ data }: { data: BlogResponseType }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.box}
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
      <div className={styles.images}>
        {data.images.map((e, i) => (
          <div key={i} className={styles.image}>
            <Image src={e} fill alt={data.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
