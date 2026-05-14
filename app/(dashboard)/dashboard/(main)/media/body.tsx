"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { useState } from "react";
import { postRequest, deleteRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { MediaResponseType } from "@/app/components/js/dataTypes";
import {
  FILEORIENTATIONS,
  FILESOURCES,
  FILETYPES,
  MaxFileSize,
  mediaUrl,
} from "@/app/components/js/config";
import { uploadFile } from "@/app/components/js/firebaseconfig";
import { useRouter } from "next/navigation";
import {
  ImageElement,
  InputElement,
  SelectElement,
  TextareaElement,
} from "../utilities";
import Image from "next/image";
import GoogleVideoCase, {
  YoutubeVideoCase,
} from "@/app/components/js/video/video";

export function Body({ media }: { media: MediaResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [fileType, setFileType] = useState<string>(FILETYPES[0]);
  const [source, setSource] = useState<string>(FILESOURCES[1]);
  const [orientation, setOrientation] = useState<string>(FILEORIENTATIONS[0]);
  const [format, setFormat] = useState<string>(FILETYPES[0]);
  const router = useRouter();
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleSubmit = async () => {
    setMessage("Please wait...");

    let url = fileType == "IMAGE" ? "" : src;
    const images: string[] = [];
    if (!url) {
      const imgs = await uploadFile(`media/${title}`, "form");
      images.push(...imgs);
    }
    const body = url
      ? {
          title,
          desc,
          orientation,
          source,
          src: url,
          type: fileType,
        }
      : images.map((e) => ({
          title,
          desc,
          orientation,
          source,
          src: e,
          type: fileType,
        }));
    const { success, message } = await postRequest(
      mediaUrl,
      body,
      `${user?.token}`,
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
      `${mediaUrl}${id}`,

      `${user?.token}`,
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
          <h1>Upload media</h1>
          <InputElement value={title} setter={setTitle} title="Title" />
          <TextareaElement value={desc} setter={setDesc} title="Description" />
          <SelectElement
            value={fileType}
            setter={setFileType}
            title="File Type"
            values={FILETYPES.map((e) => ({ displayText: e, value: e }))}
          />

          {fileType != "IMAGE" && (
            <SelectElement
              value={source}
              setter={setSource}
              title="File Source"
              values={FILESOURCES.map((e) => ({ displayText: e, value: e }))}
            />
          )}
          {fileType == "IMAGE" ? (
            <div id="elements" className={styles.imgcol}>
              <ImageElement title="Upload Image" showError={displayMessage} />
              <span
                onClick={(e) => {
                  const parent = document.getElementById(
                    "elements",
                  ) as HTMLDivElement;

                  const input = document.createElement(
                    "input",
                  ) as HTMLInputElement;
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const targ = e.target as HTMLInputElement;
                    const file = targ.files?.[0];
                    if (file) {
                      if (file.size > MaxFileSize) {
                        displayMessage(
                          "File size must be less than or equal to 2MB.",
                        );
                        targ.value = "";
                        return;
                      }
                    }
                  };
                  parent.append(input);
                }}
                className={styles.key}
              >
                Add More
              </span>
            </div>
          ) : (
            <InputElement value={src} setter={setSrc} title="File Link" />
          )}
          <SelectElement
            value={orientation}
            setter={setOrientation}
            title="Orientation"
            values={FILEORIENTATIONS.map((e) => ({ displayText: e, value: e }))}
          />
          <button className="action">Upload</button>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Media</h1>
          <SelectElement
            value={format}
            setter={setFormat}
            title={format}
            values={FILETYPES.map((e) => ({ displayText: e, value: e }))}
          />
        </div>
        <div className={styles.grid}>
          {media
            .filter((e) => e.type == format)
            .map((e, i) => (
              <div key={i} className={styles.item}>
                {e.type == "IMAGE" ? (
                  <Image height={50} width={50} alt="" src={e.src} />
                ) : e.source == "YOUTUBE" ? (
                  <YoutubeVideoCase src={e.src} orientation={"SQUARE"} />
                ) : (
                  <GoogleVideoCase src={e.src} orientation={"SQUARE"} />
                )}
                <span>{e.title}</span>
                <span className="action" onClick={() => handleDelete(e._id)}>
                  Delete
                </span>
              </div>
            ))}
        </div>
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
