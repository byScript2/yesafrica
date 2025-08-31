"use client";
import { useUserContext } from "@/app/components/js/Wrapper";
import { postRequest } from "@/app/components/js/api_client";
import { signUpUrl } from "@/app/components/js/config";
import { Countries } from "@/app/components/js/countries";
import showError from "@/app/components/js/showError";
import Spinner from "@/app/components/js/spinner/Spinner";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
export default function Body() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [oNames, setONames] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [sName, setSName] = useState<string>("");
  const [country, setCountry] = useState<string>("United States");

  const [cPassword, setCPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { logIn } = useUserContext();
  const handle = async () => {
    setError("Please wait...");
    const stripUsername = (): string => {
      const gaps = username.split(" ");
      let striped = "";
      gaps.forEach((gap) => {
        striped += gap;
      });
      return striped;
    };
    const stripEmail = (): string => {
      const gaps = email.split(" ");
      let striped = "";
      gaps.forEach((gap) => {
        striped += gap;
      });
      return striped;
    };
    const { success, message } = await postRequest(signUpUrl, {
      username: stripUsername().toLowerCase(),
      password,
      email: stripEmail().toLowerCase(),
      country,

      name: sName,
      oNames,
      tel,
    });
    if (!success) {
      showError(setError, message);
      return;
    }
    setError(
      "Your account has been created, please check your email for further instructions."
    );
  };
  return (
    <div>
      <h1>Sign up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
      >
        <label>Username</label>

        <input
          required
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          name="username"
          placeholder="Username"
        />
        <label>First Name</label>
        <input
          required
          type="text"
          onChange={(e) => {
            setSName(() => e.target.value);
          }}
          value={sName}
          autoComplete="true"
          placeholder="First Name"
          name="firstName"
        />
        <label>Other Names</label>
        <input
          required
          type="text"
          onChange={(e) => {
            setONames(() => e.target.value);
          }}
          value={oNames}
          autoComplete="true"
          placeholder="Other Names"
          name="otherNames"
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
        <input
          required
          type="tel"
          onChange={(e) => {
            setTel(e.target.value);
          }}
          value={tel}
          name="tel"
          placeholder="+1"
        />
        <label>Password</label>
        <div>
          {!showPassword ? (
            <MdOutlineVisibilityOff
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <MdOutlineVisibility
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
          <input
            required
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="password"
            name="password"
          />
        </div>
        <label>Confirm Password</label>

        <div>
          {!showPassword ? (
            <MdOutlineVisibilityOff
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <MdOutlineVisibility
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
          <input
            required
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            value={cPassword}
            name="confirm password"
            placeholder="Confirm password"
          />
        </div>

        <label>Country</label>
        <select onChange={(e) => setCountry(e.target.value)} value={country}>
          {Countries.sort().map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div>
          <input
            type="checkbox"
            id="check"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <span>
            {" "}
            I agree to <Link href={"/privacy"}>terms and conditions</Link>
          </span>
        </div>

        <button disabled={password != cPassword || !check}>
          Create Account
        </button>
        <div>
          <Link href={"/login"}>Login instead</Link>
        </div>
      </form>
      {error && <Spinner error={error} />}
    </div>
  );
}
