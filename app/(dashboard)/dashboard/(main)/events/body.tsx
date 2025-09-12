"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { Dispatch, SetStateAction, useState } from "react";
import { postRequest, putRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { EventResponseType } from "@/app/components/js/dataTypes";
import { eventUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import { ImageElement, InputElement, TextareaElement } from "../utilities";
import Link from "next/link";
import Paginate from "@/app/components/js/pager/Paginate";
import { uploadFile } from "@/app/components/js/firebaseconfig";
import Quill from "@/app/components/js/quill/quill";

export default function Body({ data }: { data: EventResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [regCloseDate, setRegCloseDate] = useState<string>("");
  const [max, setMax] = useState<string>("100");
  const [fee, setFee] = useState<string>("0");

  const [pageEvent, setPageEvent] = useState(data);

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
    const { success, message } = await postRequest(
      eventUrl,
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
  const handleDelete = async (id: string) => {
    setMessage("Please wait...");

    const { success, message } = await putRequest(
      `${eventUrl}${id}`,
      { hidden: true },

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
            <ImageElement showError={displayMessage} title="Banner Image" />
          </div>
          <div id="images">
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
            <ImageElement showError={displayMessage} title="Other Image" />
          </div>

          <button className="action">Create Event</button>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Events</h1>
        </div>
        <div className={styles.grid}>
          {pageEvent.map((e, i) => (
            <div key={i} className={styles.item}>
              <p className={styles.title}>{e.title}</p>
              <Link href={`/dashboard/events/${e._id}`} className="action">
                Edit
              </Link>
              <Link
                href={`/dashboard/events/${e._id}/attendees`}
                className="action"
              >
                Attendees
              </Link>
              <span className="action" onClick={() => handleDelete(e._id)}>
                Delete
              </span>
            </div>
          ))}
        </div>
        <Paginate
          data={data}
          setData={setPageEvent as Dispatch<SetStateAction<unknown[]>>}
        />
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
