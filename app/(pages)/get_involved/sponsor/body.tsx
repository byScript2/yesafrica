"use client";

import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import { useState } from "react";
import { MailProp } from "@/app/components/js/dataTypes";
import Spinner from "@/app/components/js/spinner/Spinner";
import { postRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";
import { mailerUrl } from "@/app/components/js/config";

export default function Body() {
  const [message, setMessage] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [name, setName] = useState<string>("");
  const handleSubmit = async () => {
    setMessage("Please wait");
    const body: MailProp = {
      pathName: "contact",
      data: [
        {
          to: {
            email: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`,
            name: "Admin",
          },
          subject: `${name} wants to become a sponsor.`,

          htmlbody: `<p>You have a new application from ${name}. <br/> "${text}"</p><p>You can reply at ${tel} or ${email}</p> `,
        },
      ],
    };
    const { success, message } = await postRequest(mailerUrl, body);
    showMessage(
      setMessage,
      success
        ? `Thank you ${name} for your generous offer, we will get back to you as soon as possible.`
        : message
    );
    if (success) {
      setName("");
      setEmail("");
      setTel("");
      setText("");
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Help us turn dreams into reality!</h1>
        <Underline2 id="dreamstoreality" />
      </div>
      <div className={styles.container}>
        <p>{`Sponsorship is one of the most impactful ways to support our mission. By sponsoring a specific
program — such as a skill acquisition bootcamp, scholarship initiative, or entrepreneurship training —
you directly invest in a young person’s growth, education, and future.`}</p>
        <p>{`You can choose to:`}</p>
        <ul>
          {[
            "Sponsor one or more beneficiaries",
            "Fund equipment or materials for a program",
            "Support a specific training cohort or campaign",
            "Donate toward operational or logistics costs",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h2>{`Every contribution counts.`}</h2>
            <Underline id="contribution" />
          </div>
          <p>{`Let your giving transform lives, create jobs, and uplift entire communities.`}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.right}
        >
          <h1>Become a Sponsor</h1>

          <label>Your full name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Your Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Your Whatsapp Number</label>
          <input
            type="number"
            name="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />

          <label>Tell us about yourself</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button className="action" disabled={!email || !tel || !text}>
            Become a Sponsor
          </button>
        </form>
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}
