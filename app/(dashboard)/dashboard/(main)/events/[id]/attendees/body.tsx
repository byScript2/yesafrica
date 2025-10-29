"use client";

import styles from "./styles.module.scss";

import { AttendeeResponseType } from "@/app/components/js/dataTypes";

import { InputElement } from "../../../utilities";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Genders } from "@/app/components/js/config";
import Paginate from "@/app/components/js/pager/Paginate";

export default function Body({ data }: { data: AttendeeResponseType[] }) {
  const [idNo, setIdNo] = useState("");
  const [pageData, setPageData] = useState(data);
  const [sortData, setSortData] = useState(data);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    const lowerName = name.toLowerCase().trim();
    const lowerEmail = email.toLowerCase().trim();
    const targetGender = gender.trim(); // Will be "" or "0" or "1"

    const filteredData = data.filter((member) => {
      const nameMatch =
        lowerName === "" || member.name.toLowerCase().includes(lowerName);

      const idMatch = idNo === "" || member.idNo.includes(idNo);

      const emailMatch =
        lowerEmail === "" || member.email.toLowerCase().includes(lowerEmail);

      const genderMatch =
        targetGender === "" || member.gender?.toString() === targetGender;

      return nameMatch && emailMatch && genderMatch && idMatch;
    });

    const sortedAndFilteredData = filteredData.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      if (a.email < b.email) return -1;
      if (a.email > b.email) return 1;

      if (a.gender < b.gender) return -1;
      if (a.gender > b.gender) return 1;

      return 0;
    });

    setSortData(sortedAndFilteredData);
  }, [data, name, email, gender, idNo]);
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h1>Confirmed registrations</h1>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Enter ID No"
            value={idNo}
            onChange={(e) => setIdNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Gender</option>
            {Genders.map((e, i) => (
              <option value={e.value} key={i}>
                {e.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        {pageData.map((e) => (
          <div key={e._id} className={styles.item}>
            <div className={styles.texts}>
              <Text name="ID Number" value={e.idNo} />
              <Text name="Name" value={e.name} />
              <Text name="Tel" value={e.tel} />
              <Text name="Email" value={e.email} />
              <Text name="Country" value={e.country} />
              <Text name="Region" value={e.region} />
              <Text
                name="Gender"
                value={
                  e.gender == 0
                    ? "Female"
                    : e.gender == 1
                    ? "Male"
                    : "Not specified"
                }
              />

              <Text name="Event Name" value={e.event.title} />
            </div>
          </div>
        ))}
      </div>
      <Paginate
        data={sortData}
        setData={setPageData as Dispatch<SetStateAction<unknown[]>>}
      />
    </div>
  );
}

function Text({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.title}>{`${name}`}</span>
      <span>{value}</span>
    </div>
  );
}
