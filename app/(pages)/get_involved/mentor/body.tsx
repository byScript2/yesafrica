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
          subject: `${name} wants to become a mentor.`,

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
        <h1>{`Shape the leaders of tomorrow`}</h1>
        <Underline2 id="shapetomorrow" />
      </div>
      <div className={styles.container}>
        <p>{`Do you have knowledge, skills, or experience that can guide young people on their journey? Join our
mentorship network and be a voice of wisdom and encouragement to youth seeking direction in
business, career, leadership, or life.`}</p>
        <p>{`Our mentorship opportunities include:`}</p>

        <ul>
          {[
            "One-on-one or group mentoring",
            "Career talks and masterclasses",
            "Advisory support for startups",
            "Emotional and character development",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h3>{`Your story can inspire.`}</h3>
            <h2>{`Your time can impact`}</h2>
            <Underline id="canimpact" />
          </div>
          <p>{`Mentorship changes lives — sometimes, all a young person needs is someone who believes in them.`}</p>
          <p>{`Together, we can give hope. Together, we can build futures.`}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.right}
        >
          <h1>Become a Mentor</h1>

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
            Become a Mentor
          </button>
        </form>
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}
