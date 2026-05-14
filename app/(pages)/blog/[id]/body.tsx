import { BlogResponseType } from "@/app/components/js/dataTypes";
import styles from "../styles.module.scss";
import Image from "next/image";
import { YoutubeVideoCase } from "@/app/components/js/video/video";
function injectImagesIntoBody(blog: BlogResponseType): string {
  const imageRegex = /\$image(\d+)/gi;

  return blog.body.replace(imageRegex, (_match, indexStr) => {
    const displayIndex = parseInt(indexStr, 10);
    const arrayIndex = displayIndex - 1; // Convert 1-based to 0-based index

    const imgSrc = blog?.images[arrayIndex];
    if (blog.images && imgSrc) {
      return `<div class="contImage"><img src="${imgSrc}"/></div>`;
    }

    return "";
  });
}
export default function Body({ data }: { data: BlogResponseType }) {
  const body = injectImagesIntoBody(data);

  return (
    <div className={styles.container}>
      <div
        className={styles.box}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
      <div className={styles.images}>
        {data.images.map((e, i) => (
          <div key={i} className={styles.image}>
            {e.includes("youtu") ? (
              <YoutubeVideoCase orientation={"SQUARE"} src={e} />
            ) : (
              <Image src={e} fill alt={data.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
