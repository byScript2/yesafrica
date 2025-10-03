"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import Spinner from "@/app/components/js/spinner/Spinner";
import {
  COMPANYNAME,
  EMAIL,
  HQ,
  mailerUrl,
  TEL,
} from "@/app/components/js/config";
import { MailProp } from "@/app/components/js/dataTypes";
import { postRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";
import Image from "next/image";
import Map from "@/app/components/js/map/map";

export default function Body() {
  const data: TopperType = {
    title: "🌍 Contact Us",
    img: "/assets/health.jpg",

    text: [
      "Have a question, an idea, or simply want to connect? At Y.E.S. Africa Foundation, we value every voice and every story. Whether you’re a young person seeking opportunities, a partner looking to collaborate, or a supporter who believes in our mission, we’d love to hear from you.",
    ],
  };
  const [message, setMessage] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
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
          subject,

          htmlbody: `<p>You have a new message from ${name}. <br/> "${text}"</p><p>You can reply at ${tel} or ${email}</p> `,
        },
      ],
    };
    const { success, message } = await postRequest(mailerUrl, body);
    showMessage(
      setMessage,
      success
        ? "We have received your email and we will reply you soon."
        : message
    );
  };
  return (
    <>
      <Topper data={data} />

      <div className={`${styles.main}`}>
        <div className={styles.box}>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.text}>
                <h1>Contact Information</h1>
                <div>
                  <h3>{`📍 Office Address`}</h3>
                  <p>{COMPANYNAME}</p>
                  <p>{HQ}</p>
                </div>
                <div>
                  <h3>{`📧 Email`}</h3>
                  <p>{EMAIL}</p>
                </div>
                <div>
                  <h3>{`📧 Whatsapp & Call`}</h3>
                  <p>{TEL}</p>
                </div>
                <div>
                  <h3>{`🕒 Business Hours`}</h3>
                  <p>{`Monday – Friday: 9:00 AM – 6:00 PM (Local Time)`}</p>
                  <p>{`Saturday & Sunday: Closed`}</p>
                </div>
                <div>
                  <h3>{`🕒 Online access/support`}</h3>
                  <p>{`24/7`}</p>
                </div>
              </div>
              <div className={styles.image}>
                <Image src={"/assets/shake.jpg"} alt="" fill />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <h1>Write to us</h1>
              <p>We will reply within 48 hours</p>
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
              <label>Subject</label>
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label>Body</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="action"
                disabled={!email || !tel || !subject || !text}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {message && <Spinner error={message} />}
      </div>
      <Map />
    </>
  );
}
