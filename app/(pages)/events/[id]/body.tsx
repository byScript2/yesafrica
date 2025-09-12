"use client";
import { EventResponseType } from "@/app/components/js/dataTypes";
import styles from "../styles.module.scss";
import Image from "next/image";
import { useState } from "react";
import Spinner from "@/app/components/js/spinner/Spinner";
import { postRequest } from "@/app/components/js/api_client";
import { attendeeUrl, paymentUrl } from "@/app/components/js/config";
import showMessage from "@/app/components/js/showError";
import { uploadFile } from "@/app/components/js/firebaseconfig";
import {
  ImageElement,
  InputElement,
  SelectElement,
} from "@/app/(dashboard)/dashboard/(main)/utilities";

export default function Body({ data }: { data: EventResponseType }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const roles = ["Participant", "Camera Crew", "Security", "Coordinator"];
  const [role, setRole] = useState(roles[0]);
  function dateString(e: number) {
    const date = new Date(e);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  const handleSubmit = async () => {
    setMessage("Please wait");
    const images = await uploadFile(`attendant/${data.title}/${name}`, "form");
    if (images.length == 0) {
      showMessage(setMessage, "Please upload your photo");
      return;
    }
    const {
      success,
      message,
      data: dt,
    } = await postRequest(data.fee > 0 ? paymentUrl : attendeeUrl, {
      email,
      name,
      role,
      tel,
      image: images[0],
      eventId: data._id,
      amount: data.fee,
    });
    showMessage(
      setMessage,
      success
        ? data.fee > 0
          ? "Redirecting..."
          : "Registration confirmed"
        : message
    );
    if (dt && data.fee > 0) window.location.assign(dt.url);
    else if (dt) {
      setTimeout(() => location.reload(), 2000);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <div className={styles.left}>
          <div className={styles.others}>
            <Text name="Date" value={dateString(data.date)} />
            <Text
              name="Registration Deadline"
              value={dateString(data.regCloseDate)}
            />
            <Text
              name="Fee"
              value={
                data.fee == 0
                  ? "Free"
                  : `NGN ${data.fee.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}`
              }
            />
            <Text
              name="Expected Number of Guests"
              value={data.max.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            />
          </div>
          <div
            className={styles.box}
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>
        <div className={styles.right}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            id="form"
          >
            <h1>Register</h1>
            <InputElement
              setter={setEmail}
              value={email}
              type="email"
              title="Email"
            />
            <InputElement setter={setName} value={name} title="Full Name" />
            <InputElement
              setter={setTel}
              value={tel}
              type="number"
              title="Phone Number"
            />
            <SelectElement
              setter={setRole}
              value={role}
              values={roles.map((e) => ({ displayText: e, value: e }))}
              title="Role"
            />
            <ImageElement
              title="Upload your picture"
              showError={(e) => showMessage(setMessage, e)}
            />

            <button className="action" disabled={!email || !tel || !name}>
              Register
            </button>
          </form>
        </div>
      </div>
      <div className={styles.images}>
        {data.images.map((e, i) => (
          <div key={i} className={styles.image}>
            <Image src={e} fill alt={data.title} />
          </div>
        ))}
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}

function Text({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.title}>{`${name} : `}</span>
      <span>{value}</span>
    </div>
  );
}
