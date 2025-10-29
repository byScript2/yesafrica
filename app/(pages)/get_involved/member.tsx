"use client";
import styles from "./styles.module.scss";
import { postRequest } from "@/app/components/js/api_client";
import { Genders, membersUrl } from "@/app/components/js/config";
import { CountriesStates } from "@/app/components/js/countries";

import showError from "@/app/components/js/showError";
import Spinner from "@/app/components/js/spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Member({
  role,
  title,
}: {
  role: string;
  title: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [gender, setGender] = useState<string>("1");
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("Nigeria");
  const [regions, setRegions] = useState<string[]>([]);

  const [error, setError] = useState<string>("");

  const handle = async () => {
    setError("Please wait...");
    const selected = document.querySelectorAll<HTMLInputElement>(
      'input[name="interests"]:checked'
    );

    const interests = Array.from(selected).map((cb) => cb.value);
    const { success, message } = await postRequest(membersUrl, {
      name,
      email,
      interests,
      country,
      region: region || "Nil",
      gender: gender == "1" ? 1 : 0,
      tel,
      role,
    });
    if (!success) {
      showError(setError, message);
      return;
    }
    setError("Thank you for joining us, we will be in touch soon!");
    setTimeout(() => {
      router.push("/about");
    }, 2000);
  };

  useEffect(() => {
    const region = CountriesStates.find((e) => e.name == country);
    setRegions(() => region?.states || []);
  }, [country]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
      className={styles.right}
    >
      <h1>{title}</h1>
      <label>Name</label>
      <input
        required
        type="text"
        onChange={(e) => {
          setName(() => e.target.value);
        }}
        value={name}
        autoComplete="true"
        placeholder="Name"
      />

      <label>Email</label>
      <input
        required
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        name="email"
        placeholder="someone@gmail.com"
      />
      <label>Phone number</label>
      <span style={{ color: "red" }}>Kindly indicate your country code</span>

      <input
        required
        type="tel"
        onChange={(e) => {
          setTel(e.target.value);
        }}
        value={tel}
        name="tel"
      />
      <label>Gender</label>
      <select onChange={(e) => setGender(e.target.value)} value={gender}>
        {Genders.map((e, i) => (
          <option key={i} value={e.value}>
            {e.text}
          </option>
        ))}
      </select>
      <label>Country</label>
      <select onChange={(e) => setCountry(e.target.value)} value={country}>
        <option value="">Select</option>
        {CountriesStates.map((e, i) => (
          <option key={i} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
      <label>{`Region`}</label>
      <select onChange={(e) => setRegion(e.target.value)} value={region}>
        <option value="">Select</option>
        {regions.map((e, i) => (
          <option key={i} value={e}>
            {e}
          </option>
        ))}
      </select>

      <label>Areas of interests</label>
      <div className="interests">
        {[
          "Empowerment support",
          "Mentorship",
          "Entrepreneurhip Development",
          "Leadership Programs",
        ].map((e, i) => (
          <label key={i}>
            <input
              type="checkbox"
              name="interests"
              value={e}
              onChange={(e) => {
                const checked = document.querySelectorAll(
                  'input[name="interests"]:checked'
                );
                if (checked.length > 2) {
                  e.target.checked = false;
                  alert("You can only select up to 2 interests.");
                }
              }}
            />{" "}
            <span>{e}</span>
          </label>
        ))}
      </div>

      <span style={{ marginBottom: "20px" }}>
        By clicking the submit button, you agree to our{" "}
        <Link href={"/terms"} className="color">
          terms and conditions
        </Link>
      </span>

      <button>Submit</button>
      {error && <Spinner error={error} />}
    </form>
  );
}
