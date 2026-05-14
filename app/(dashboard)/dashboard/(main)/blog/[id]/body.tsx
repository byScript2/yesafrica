"use client";

import styles from "../styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { useEffect, useState } from "react";
import { deleteRequest, putRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { BlogResponseType } from "@/app/components/js/dataTypes";
import { blogUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import { ImageElement, InputElement, TextareaElement } from "../../utilities";

import { uploadFile } from "@/app/components/js/firebaseconfig";
import Quill from "@/app/components/js/quill/quill";
import Link from "next/link";

export default function Body({ data }: { data: BlogResponseType }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>(data.title);
  const [desc, setDesc] = useState<string>(data.desc);
  const [body, setBody] = useState<string>(data.body);
  const [vid, setVid] = useState("");
  const router = useRouter();
  useEffect(() => {
    const found = data.images.find((e) => e.includes("youtu"));
    if (found) {
      setVid(found);
    }
  }, [data]);
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleSubmit = async () => {
    setMessage("Please wait...");
    const images1 = await uploadFile(`${title} title`, "title");
    const images = await uploadFile(`${title} images`, "images");
    if (vid) images.push(vid);
    const { success, message } = await putRequest(
      `${blogUrl}${data._id}`,
      {
        title,
        desc,
        body,
        banner: images1[0],
        images,
      },
      `${user?.token}`,
    );
    if (success) {
      displayMessage(message);
      router.refresh();
    } else {
      displayMessage(message);
    }
  };
  const handleDelete = async () => {
    setMessage("Please wait...");

    const { success, message } = await deleteRequest(
      `${blogUrl}${data._id}`,

      `${user?.token}`,
    );
    if (success) {
      displayMessage(message);
      router.replace("/dashboard/blog");
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
          <Link href={"/dashboard/blog"} className="linkText">
            Back
          </Link>
          <h1>Update Blog Post</h1>
          <TextareaElement value={title} setter={setTitle} title="Title" />
          <TextareaElement value={desc} setter={setDesc} title="Introduction" />
          <label>Body</label>
          <Quill value={body} setValue={setBody} />
          <div id="title">
            <ImageElement
              showError={displayMessage}
              title="Banner Image (Change previous banner)"
              aria={data.banner}
            />
          </div>
          <div id="images">
            {data.images
              .filter((e) => !e.includes("youtu"))
              .map((e, i) => (
                <ImageElement
                  showError={displayMessage}
                  title="Other Image (Upload new to change)"
                  key={i}
                  aria={e}
                />
              ))}
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
          </div>
          <InputElement
            title="Enter Youtube link"
            value={vid}
            setter={setVid}
          />
          <button className="action">Update Post</button>
          <span className="action" onClick={() => handleDelete()}>
            Delete
          </span>
        </form>
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
