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
          subject: `${name} wants to partner for a program.`,

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
        <h1>{`Let's do more together!`}</h1>
        <Underline2 id="domoretogether" />
      </div>
      <div className={styles.container}>
        <p>{`At YES Africa Foundation, we believe in the power of collaboration. Whether you're a business,
Government Agency, Media Organization, Educational institution, NGO, we are open to strategic
partnerships that amplify youth empowerment and drive sustainable development. We welcome
partnership in areas such as:`}</p>

        <ul>
          {[
            "Joint projects or campaigns",
            "Internship/job placement for youth",
            "Training content or workshop support",
            "Event sponsorship or co-hosting",
            "Corporate social responsibility (CSR) alignment",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <h3>{`Together, We Can Do More.`}</h3>

        <p>{`Let’s build solutions that last, hand in hand.`}</p>
        <ul>
          {[
            "Expand access to youth-focused programs",
            "Co-create training modules or workshops",
            "Provide internships or job placement",
            "Host joint conferences or empowerment events",
            "Align with your CSR or impact goals",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h2>{`Your brand. Our mission. Shared success.`}</h2>
            <Underline id="contribution" />
          </div>
          <p>{`Imagine what we can do together!`}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.right}
        >
          <h1>Become a Partner</h1>

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
            Become a Partner
          </button>
        </form>
      </div>
      {message && <Spinner error={message} />}
    </div>
  );
}
