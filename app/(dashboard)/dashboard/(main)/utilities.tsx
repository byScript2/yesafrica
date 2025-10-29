"use client";

import { MaxFileSize } from "@/app/components/js/config";
import { Dispatch, SetStateAction } from "react";

export function InputElement({
  type = "text",
  value,
  setter,
  title,
}: {
  type?: "text" | "number" | "datetime-local" | "password" | "email" | "tel";
  value: string;
  setter: Dispatch<SetStateAction<string>>;

  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <label> {title}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
}
export function ImageElement({
  title,
  showError,
  aria = "",
}: {
  showError: (e: string) => void;
  aria?: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <label> {title}</label>
      <input
        type={"file"}
        aria-describedby={aria}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > MaxFileSize) {
              showError("File size must be less than or equal to 2MB.");
              e.target.value = "";
              return;
            }
          }
        }}
        accept="image/*"
      />
    </div>
  );
}
export function TextareaElement({
  value,
  setter,
  title,
}: {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <label> {title}</label>
      <textarea value={value} onChange={(e) => setter(e.target.value)} />
    </div>
  );
}
export function SelectElement({
  value,
  setter,
  title,
  values,
}: {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  title: string;
  values: { value: string; displayText: string }[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <label> {title}</label>
      <select value={value} onChange={(e) => setter(e.target.value)}>
        <option value={""}>Select</option>
        {values.map((e, i) => (
          <option value={e.value} key={i}>
            {e.displayText}
          </option>
        ))}
      </select>
    </div>
  );
}
