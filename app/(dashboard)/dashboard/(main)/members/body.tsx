"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { useState } from "react";
import { deleteRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { MemberResponseType } from "@/app/components/js/dataTypes";
import { membersUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";

export function Body({ data }: { data: MemberResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");

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

  return (
    <div className={styles.main}>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Members</h1>
        </div>
        <div className={styles.grid}>
          {data.map((e, i) => (
            <div key={i} className={styles.item}>
              <span>{`${e.name}`}</span>
              <span>{`${e.email}`}</span>
              <span>{`${e.tel}`}</span>
              <span>{`${e.interests}`}</span>
              <span className="action" onClick={() => handleDelete(e._id)}>
                Delete
              </span>
            </div>
          ))}
        </div>
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
