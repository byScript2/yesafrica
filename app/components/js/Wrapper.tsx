"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import Script from "next/script";
import { UserResponseType } from "./dataTypes";
import { useRouter } from "next/navigation";
import { postRequest } from "./api_client";
import { tokenUrl } from "./config";
import { analytics } from "./firebaseconfig";
import { logEvent } from "firebase/analytics";
export interface Props {
  children?: React.ReactNode;
}

export interface UserContextType {
  user: UserResponseType | null;

  logout: () => void;
  logIn: (user: UserResponseType) => void;

  setUser: (user: UserResponseType) => void;
}
export const UserContext = createContext<UserContextType | null>(null);
export const useUserContext = () => useContext(UserContext) as UserContextType;

export default function Wrap({ children }: Props) {
  const [user, setUser] = useState<UserResponseType | null>(null);

  const router = useRouter();
  const logout = () => {
    document.cookie = "token=; path=/";
    document.cookie = "token=; path=/dashboard";
    document.cookie = "token=; path=/login";
    document.cookie = "token=; path=/signup";
    setUser(() => null);
    location.reload();
  };

  const logIn = (user: UserResponseType) => {
    const date: Date = new Date();
    const expireDate: number = date.getFullYear() + 2;
    date.setFullYear(expireDate);
    document.cookie = `token=${user.token};Expires=${date}; path=/`;
    document.cookie = `token=${user.token};Expires=${date}; path=/login`;
    document.cookie = `token=${user.token};Expires=${date}; path=/dashboard`;
    document.cookie = `token=${user.token};Expires=${date}; path=/signup`;
    setUser(user);

    router.replace("/dashboard");
  };
  const updateUser = (uzer: UserResponseType) => {
    uzer.token = user?.token || "";
    setUser(uzer);
  };

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        return;
      }
      try {
        const cookies = document.cookie?.split(";");
        const bearer = cookies?.filter((cookie) => {
          return cookie.includes("token");
        });
        let bearerToken: string | null;
        if (bearer?.length) {
          bearerToken = bearer[0].split("=")[1];
        } else {
          bearerToken = null;
        }

        if (bearerToken) {
          const { data } = await postRequest(
            tokenUrl,
            {
              token: bearerToken,
            },
            bearerToken
          );

          setUser(data);
        }
      } catch (error) {}
    };
    getUser();
  }, [user?.token]);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view");
    }
  }, []);

  return (
    <div>
      <UserContext.Provider
        value={{
          logIn,
          user,
          setUser: updateUser,

          logout,
        }}
      >
        {children}
      </UserContext.Provider>

      <Script id="chatsupooriejek">
        {`
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'd4c25384a0a543706afeedbde62224caf00c3c67';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
        `}
      </Script>
    </div>
  );
}
