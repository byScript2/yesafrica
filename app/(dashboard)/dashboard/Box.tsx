"use client";
import { ReactNode, useState } from "react";
import styles from "./Box.module.scss";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { BiWallet } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { RiLuggageDepositLine } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { GiGroundSprout } from "react-icons/gi";

import { MdAccountCircle } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useUserContext } from "@/app/components/js/Wrapper";
import { COMPANYNAME, signUpUrl } from "@/app/components/js/config";
import { putRequest } from "@/app/components/js/api_client";
import showError from "@/app/components/js/showError";
import Spinner from "@/app/components/js/spinner/Spinner";

import Image from "next/image";

interface LinkProp {
  name: string;
  link: string;
  icon: IconType;
}
const Box: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useUserContext();
  const user = context?.user;
  const logout = context?.logout;
  const adminLinks: LinkProp[] = [
    {
      name: "Clients",
      link: "/dashboard/users",
      icon: HiOutlineUsers,
    },
    {
      name: "Mail",
      link: "/dashboard/mail",
      icon: CgMail,
    },
    {
      name: "Copy Trading",
      link: "/dashboard/copy_trading",
      icon: FaHandHoldingUsd,
    },
    {
      name: "Account",
      link: "/dashboard/account",
      icon: MdAccountCircle,
    },
  ];
  const userLinks: LinkProp[] = [
    {
      name: "Deposit",
      link: "/dashboard/deposit",
      icon: RiLuggageDepositLine,
    },
    {
      name: "Withdraw",
      link: "/dashboard/withdraw",
      icon: BiWallet,
    },

    {
      name: "Invest",
      link: "/dashboard/invest",
      icon: GiGroundSprout,
    },
    {
      name: "Copy Trading",
      link: "/dashboard/copy_trading",
      icon: FaHandHoldingUsd,
    },
    {
      name: "Account",
      link: "/dashboard/account",
      icon: MdAccountCircle,
    },
  ];
  const topLinks: { link: string; name: string }[] = [
    {
      link: "/dashboard",
      name: "Dashboard",
    },
    {
      link: "/dashboard/transactions",
      name: "Transactions",
    },

    {
      link: "/dashboard/investments/history",
      name: "Investments",
    },
    {
      link: "/dashboard/referrals",
      name: "Referrals",
    },
  ];
  const [error, setError] = useState<string>("");
  const handleVerify = async () => {
    setError("Sending...");
    const { message, success } = await putRequest(
      signUpUrl,
      {
        sendVerification: true,
      },
      `${user?.token}`
    );
    showError(
      setError,
      success ? "We have resent the verification link" : message
    );
  };
  return (
    <div className={styles.box}>
      {error && <Spinner error={error} />}

      <div className={styles.top}>
        <div className={styles.first}>
          <Link href={"/"} className={styles.logo}>
            <Image src={"/logo.png"} fill alt="" />
          </Link>
          <h1>{`WELCOME ${user?.name.toUpperCase()}`}</h1>
          <h1>{COMPANYNAME} DASHBAORD</h1>
        </div>

        <div className={styles.last}>
          {topLinks.map((link, i) => (
            <Link href={link.link} key={i}>
              {link.name}
            </Link>
          ))}

          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.children}>{children}</div>
      </div>
      <div className={styles.bottom}>
        {user?.role
          ? adminLinks.map((link, i) => (
              <Link href={link.link} key={i}>
                <span>{link.name}</span>
                <link.icon className={styles.icon} />
              </Link>
            ))
          : userLinks.map((link, i) => (
              <Link href={link.link} key={i}>
                <span>{link.name}</span>
                <link.icon className={styles.icon} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Box;
