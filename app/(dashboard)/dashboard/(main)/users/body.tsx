"use client";

import styles from "./styles.module.scss";
import { useUserContext } from "@/app/components/js/Wrapper";
import { useState } from "react";
import { postRequest, deleteRequest } from "@/app/components/js/api_client";
import showMessage from "@/app/components/js/showError";

import Spinner from "@/app/components/js/spinner/Spinner";
import { UserResponseType } from "@/app/components/js/dataTypes";
import { usersUrl } from "@/app/components/js/config";

import { useRouter } from "next/navigation";
import { InputElement, SelectElement } from "../utilities";

export function Body({ data }: { data: UserResponseType[] }) {
  const context = useUserContext();
  const user = context?.user;

  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [oNames, setONames] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("1");
  const roles = [
    { role: 1, text: "Admin" },
    { role: 2, text: "Super Admin" },
  ];
  const router = useRouter();
  function displayMessage(message: string) {
    showMessage(setMessage, message);
  }

  const handleSubmit = async () => {
    setMessage("Please wait...");

    const { success, message } = await postRequest(
      usersUrl,
      {
        email,
        role: parseInt(role),
        name,
        oNames,
        password,
        tel,
      },
      `${user?.token}`
    );
    if (success) {
      displayMessage(message);
      router.refresh();
    } else {
      displayMessage(message);
    }
  };
  const handleDelete = async (id: string) => {
    setMessage("Please wait...");

    const { success, message } = await deleteRequest(
      `${usersUrl}${id}`,

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
      <div className={styles.left}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          id="form"
        >
          <h1>Create Admin User</h1>
          <InputElement
            value={email}
            setter={setEmail}
            title="Email"
            type="email"
          />
          <InputElement value={name} setter={setName} title="Surname" />
          <InputElement value={oNames} setter={setONames} title="Other Names" />
          <InputElement
            value={password}
            setter={setPassword}
            title="Password"
          />
          <InputElement value={tel} setter={setTel} title="Phone Number" />

          <SelectElement
            value={role}
            setter={setRole}
            title="Role"
            values={roles.map((e) => ({
              displayText: e.text,
              value: e.role.toString(),
            }))}
          />

          <button className="action">Create User</button>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Users</h1>
        </div>
        <div className={styles.grid}>
          {data.map((e, i) => (
            <div key={i} className={styles.item}>
              <span>{`${e.name} ${e.oNames}`}</span>
              <span>{`${e.email}`}</span>
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
