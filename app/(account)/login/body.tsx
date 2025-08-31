"use client";
import { useUserContext } from "@/app/components/js/Wrapper";
import { postRequest } from "@/app/components/js/api_client";
import { loginUrl } from "@/app/components/js/config";
import showError from "@/app/components/js/showError";
import Spinner from "@/app/components/js/spinner/Spinner";
import Link from "next/link";
import { useState } from "react";
export default function Body() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { logIn } = useUserContext();
  const handle = async () => {
    setError("Please wait...");
    const { data, success, message } = await postRequest(loginUrl, {
      email,
      password,
    });
    if (!success) {
      showError(setError, message);
      return;
    }
    setError("Login successful");
    logIn(data);
  };
  return (
    <div>
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
      >
        <label>Email or Username</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={email.length < 3 || password.length < 3}>
          Login
        </button>
        <div>
          <Link href={"/signup"}>Create Account</Link>
          <Link href={"/forgotpassword"}>Forgot Password</Link>
        </div>
      </form>
      {error && <Spinner error={error} />}
    </div>
  );
}
