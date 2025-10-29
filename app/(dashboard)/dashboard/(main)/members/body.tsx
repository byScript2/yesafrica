"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deleteRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { MemberResponseType } from "@/app/components/js/dataTypes";
import { Genders, membersUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import Paginate from "@/app/components/js/pager/Paginate";

export function Body({ data }: { data: MemberResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [pageData, setPageData] = useState(data);
  const [sortData, setSortData] = useState(data);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleDelete = async (id: string) => {
    setMessage("Please wait...");

    const { success, message } = await deleteRequest(
      `${membersUrl}${id}`,

      `${user?.token}`
    );
    if (success) {
      displayMessage(message);
      router.refresh();
    } else {
      displayMessage(message);
    }
  };

  useEffect(() => {
    const lowerName = name.toLowerCase().trim();
    const lowerEmail = email.toLowerCase().trim();
    const targetGender = gender.trim(); // Will be "" or "0" or "1"

    const filteredData = data.filter((member) => {
      const nameMatch =
        lowerName === "" || member.name.toLowerCase().includes(lowerName);

      const emailMatch =
        lowerEmail === "" || member.email.toLowerCase().includes(lowerEmail);

      const genderMatch =
        targetGender === "" || member.gender?.toString() === targetGender;

      return nameMatch && emailMatch && genderMatch;
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
  }, [data, name, email, gender]);

  return (
    <div className={styles.main}>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Members</h1>
          <div className={styles.filters}>
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
          {pageData.map((e, i) => (
            <div key={i} className={styles.item}>
              <span>{`${e.name}`}</span>
              <span>{`${e.email}`}</span>
              <span>{`${
                e.gender == 0
                  ? "Female"
                  : e.gender == 1
                  ? "Male"
                  : "Not specified"
              }`}</span>
              <span>{`${e.tel}`}</span>
              <span>{`${e.country || ""}`}</span>
              <span>{`${e.region || ""}`}</span>
              <span>{`Role: ${e.role}`}</span>
              <span>{`Interests are: ${e.interests}`}</span>
              <span className="action" onClick={() => handleDelete(e._id)}>
                Delete
              </span>
            </div>
          ))}
        </div>
        <Paginate
          data={sortData}
          setData={setPageData as Dispatch<SetStateAction<unknown[]>>}
        />
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
