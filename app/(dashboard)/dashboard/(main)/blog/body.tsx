"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { Dispatch, SetStateAction, useState } from "react";
import { postRequest, deleteRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { BlogResponseType } from "@/app/components/js/dataTypes";
import { blogUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import { ImageElement, TextareaElement } from "../utilities";
import Link from "next/link";
import Paginate from "@/app/components/js/pager/Paginate";
import { uploadFile } from "@/app/components/js/firebaseconfig";
import Quill from "@/app/components/js/quill/quill";

export default function Body({ data }: { data: BlogResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [pageBlog, setPageBlog] = useState(data);

  const router = useRouter();
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleSubmit = async () => {
    setMessage("Please wait...");
    const images1 = await uploadFile(`${title} title`, "title");
    const images = await uploadFile(`${title} images`, "images");
    const { success, message } = await postRequest(
      blogUrl,
      {
        title,
        desc,
        body,
        banner: images1[0],
        images,
      },
      `${user?.token}`
    );
    if (success) {
      displayMessage(message);
      router.refresh();
    } else {
      displayMessage(message);
    }
  };
  const handleDelete = async (id: string) => {
    setMessage("Please wait...");

    const { success, message } = await deleteRequest(
      `${blogUrl}${id}`,

      `${user?.token}`
    );
    if (success) {
      displayMessage(message);
      router.refresh();
    } else {
      displayMessage(message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          id="form"
        >
          <h1>Create Blog Post</h1>
          <TextareaElement value={title} setter={setTitle} title="Title" />
          <TextareaElement value={desc} setter={setDesc} title="Introduction" />
          <label>Body</label>
          <Quill value={body} setValue={setBody} />
          <div id="title">
            <ImageElement showError={displayMessage} title="Banner Image" />
          </div>
          <div id="images">
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
          </div>

          <button className="action">Create Post</button>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Posts</h1>
        </div>
        <div className={styles.grid}>
          {pageBlog.map((e, i) => (
            <div key={i} className={styles.item}>
              <p className={styles.title}>{e.title}</p>

              <span className="action" onClick={() => handleDelete(e._id)}>
                Delete
              </span>
              <Link href={`/dashboard/blog/${e._id}`} className="action">
                Edit
              </Link>
            </div>
          ))}
        </div>
        <Paginate
          data={data}
          setData={setPageBlog as Dispatch<SetStateAction<unknown[]>>}
        />
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
