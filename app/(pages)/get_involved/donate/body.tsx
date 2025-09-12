"use client";

import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import { useState } from "react";
import { MailProp } from "@/app/components/js/dataTypes";
import Spinner from "@/app/components/js/spinner/Spinner";
import { postRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";
import { mailerUrl, paymentUrl } from "@/app/components/js/config";

export default function Body() {
  const [message, setMessage] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [tel, setTel] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const handleSubmit = async () => {
    setMessage("Please wait");

    const { success, message, data } = await postRequest(paymentUrl, {
      name,
      tel,
      purpose: text,
      amount: parseFloat(amount),
    });
    if (success) {
      window.location.assign(data.url);
    } else {
      showMessage(setMessage, message);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>{`Your Gift Can Change a Life.`}</h1>
        <Underline2 id="giftchangelife" />
      </div>
      <div className={styles.container}>
        <p>{`Every contribution you make brings us one step closer to a world where young people have the tools,
skills, and support to thrive. At YES Africa Foundation, your donation helps us provide the following:`}</p>

        <ul>
          {[
            "Free skill acquisition programs",
            "Mentorship opportunities",
            "Startup support for youth-led businesses",
            "Learning materials and educational scholarships",
            "Safe, empowering spaces for young people to grow",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <h3>{`Whether it’s a one-time gift or monthly support, your donation matters.`}</h3>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h2>{`Every contribution sparks change.`}</h2>
            <Underline id="canimpact" />
          </div>
          <p>{`All donations are secure and go directly to youth-focused projects.`}</p>
          <p>{`Be part of the impact. Donate now and invest in Africa’s future.`}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.right}
        >
          <h1>Donate Now</h1>

          <label>Your full name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Whatsapp Number</label>
          <input
            type="number"
            name="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>
            Tell us about yourself, and what you would like your donation to be
            used for.
          </label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button className="action" disabled={!tel || !text}>
            Make Donation
          </button>
        </form>
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}
