"use client";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";

import { putRequest } from "@/app/components/js/api_client";
import { usersUrl } from "@/app/components/js/config";
import showMessage from "@/app/components/js/showError";
import Spinner from "@/app/components/js/spinner/Spinner";

export default function Body() {
  const context = useUserContext();
  const user = context?.user;
  const [message, setMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const handleUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 5) return;
    setMessage("please wait...");

    const { message } = await putRequest(
      `${usersUrl}${user?._id}`,
      { password },
      user?.token
    );
    showMessage(setMessage, message);
  };

  return (
    <div className={styles.main}>
      <div className={styles.column}>
        <div className={styles.planAccount}>
          <div className={styles.text}>
            <h3>{user?.name ? user.name + " " + user.oNames : ""}</h3>
            <p>{user?.email && user.email}</p>
            <p>{user?.tel && user.tel}</p>
          </div>
        </div>
        <form onSubmit={(e) => handleUser(e)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={password.length < 5}>Change Password</button>
        </form>
      </div>

      {message && <Spinner error={message} />}
    </div>
  );
}
