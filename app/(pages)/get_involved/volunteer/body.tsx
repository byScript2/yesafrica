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
          subject: `${name} wants to join volunteer team.`,

          htmlbody: `<p>You have a new volunteer from ${name}. <br/> "${text}"</p><p>You can reply at ${tel} or ${email}</p> `,
        },
      ],
    };
    const { success, message } = await postRequest(mailerUrl, body);
    showMessage(
      setMessage,
      success
        ? "Thank you for reaching out, we will get back to you as soon as possible."
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
        <h1>Be the change you want to see!</h1>
        <Underline2 id="changeyousee" />
      </div>
      <div className={styles.container}>
        <p>{`Join our growing network of passionate volunteers who are dedicated to empowering young people
across communities. Whether you’re a professional, student, creative, or simply someone with a heart to
serve — your time, skills, and energy can make a real difference.`}</p>
        <p>{`Our volunteer opportunities include:`}</p>
        <ul>
          {[
            "Event coordination and logistics",
            "Community outreach and sensitization",
            "Media and content creation",
            "Admin and program support",
            "Mentorship and training facilitation",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <p>{`As a volunteer, you can:`}</p>
        <ul>
          {[
            "Support events and outreach programs",
            "Facilitate training or mentorship sessions",
            "Help with administrative or creative tasks",
            "Become a brand ambassador in your local community",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h3>{`You don’t need to be perfect`}</h3>
            <h2>{`just willing`}</h2>
            <Underline id="notperfect" />
          </div>
          <p>{`Why volunteer? Volunteering allows you to gain valuable experience, grow your network, and contribute to a cause that shapes the future of Africa—one youth at a time. With every opportunity, we provide orientation, support, and room to grow, ensuring your journey is as rewarding as it is impactful. Make your time count and volunteer with purpose.`}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.right}
        >
          <h1>Join Our Volunteer Team</h1>

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
            Join us
          </button>
        </form>
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}
