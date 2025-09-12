"use client";

import styles from "../styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { useState } from "react";
import { putRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { EventResponseType } from "@/app/components/js/dataTypes";
import { eventUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import { ImageElement, InputElement, TextareaElement } from "../../utilities";

import { uploadFile } from "@/app/components/js/firebaseconfig";
import Quill from "@/app/components/js/quill/quill";
import Link from "next/link";

export default function Body({ data }: { data: EventResponseType }) {
  const context = useUserContext();
  const user = context?.user;
  function toDateTimeLocal(timestamp: number) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>(data.title);
  const [desc, setDesc] = useState<string>(data.desc);
  const [body, setBody] = useState<string>(data.body);
  const [date, setDate] = useState<string>(toDateTimeLocal(data.date));
  const [regCloseDate, setRegCloseDate] = useState<string>(
    toDateTimeLocal(data.regCloseDate)
  );
  const [max, setMax] = useState<string>(data.max.toString());
  const [fee, setFee] = useState<string>(data.fee.toString());

  const router = useRouter();
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleSubmit = async () => {
    setMessage("Please wait...");
    const images1 = await uploadFile(`events/${title} title`, "title");
    const images = await uploadFile(`events/${title} images`, "images");
    function stringDate(e: string) {
      const date = new Date(e).getTime();
      return date;
    }
    const { success, message } = await putRequest(
      `${eventUrl}${data._id}`,
      {
        title,
        desc,
        body,
        banner: images1[0],
        images,
        date: stringDate(date),
        regCloseDate: stringDate(regCloseDate),
        fee: parseFloat(fee),
        max: parseInt(max),
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
  const handleDelete = async () => {
    setMessage("Please wait...");

    const { success, message } = await putRequest(
      `${eventUrl}${data._id}`,
      { hidden: true },

      `${user?.token}`
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
          <Link href={"/dashboard/events"} className="linkText">
            Back
          </Link>
          <h1>Create Event</h1>
          <TextareaElement value={title} setter={setTitle} title="Title" />
          <TextareaElement value={desc} setter={setDesc} title="Introduction" />
          <InputElement
            value={date}
            setter={setDate}
            title="Date"
            type={"datetime-local"}
          />
          <InputElement
            value={regCloseDate}
            setter={setRegCloseDate}
            title="Registration Close Date"
            type={"datetime-local"}
          />
          <InputElement
            value={fee}
            setter={setFee}
            title="Fee"
            type={"number"}
          />
          <InputElement
            value={max}
            setter={setMax}
            title="Maximum Attendants"
            type={"number"}
          />

          <label>Body</label>
          <Quill value={body} setValue={setBody} />
          <div id="title">
            <ImageElement
              showError={displayMessage}
              title="Banner Image (Change previous image)"
              aria={data.banner}
            />
          </div>
          <div id="images">
            {data.images.map((e, i) => (
              <ImageElement
                key={i}
                showError={displayMessage}
                title="Other Image (Change previous image)"
                aria={e}
              />
            ))}
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
          </div>

          <button className="action">Update Event</button>
          <span className="action" onClick={() => handleDelete()}>
            Delete
          </span>
        </form>
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
