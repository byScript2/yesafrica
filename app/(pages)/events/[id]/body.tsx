"use client";
import { EventResponseType } from "@/app/components/js/dataTypes";
import styles from "../styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/js/spinner/Spinner";
import { postRequest } from "@/app/components/js/api_client";
import { attendeeUrl, Genders, paymentUrl } from "@/app/components/js/config";
import showMessage from "@/app/components/js/showError";
import { uploadFile } from "@/app/components/js/firebaseconfig";
import {
  ImageElement,
  InputElement,
  SelectElement,
} from "@/app/(dashboard)/dashboard/(main)/utilities";
import { CountriesStates } from "@/app/components/js/countries";

export default function Body({ data }: { data: EventResponseType }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState<string>("1");
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("Nigeria");
  const [regions, setRegions] = useState<string[]>([]);
  const [promote, setPromote] = useState(false);
  useEffect(() => {
    const region = CountriesStates.find((e) => e.name == country);
    setRegions(() => region?.states || []);
  }, [country]);
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

    const {
      success,
      message,
      data: dt,
    } = await postRequest(data.fee > 0 ? paymentUrl : attendeeUrl, {
      email,
      name,
      country,
      region: region || "Nil",
      gender: gender == "1" ? 1 : 0,
      tel,

      eventId: data._id,
      amount: data.fee,
      promote,
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

            <SelectElement
              setter={setGender}
              value={gender}
              values={Genders.map((e) => ({
                displayText: e.text,
                value: e.value.toString(),
              }))}
              title="Gender"
            />
            <InputElement
              setter={setTel}
              value={tel}
              type="number"
              title="Phone Number"
            />
            <SelectElement
              setter={setCountry}
              value={country}
              values={CountriesStates.map((e) => ({
                displayText: e.name,
                value: e.name,
              }))}
              title="Country"
            />
            <SelectElement
              setter={setRegion}
              value={region}
              values={regions.map((e) => ({ displayText: e, value: e }))}
              title="Region"
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
