import { WEBLINK } from "./components/js/config";
import Wrap from "./components/js/Wrapper";

import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Source_Sans_3, Ubuntu } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--normal",
  weight: ["400", "600", "700", "500", "800", "900"],
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--special",
  weight: ["400", "500", "700"],
  display: "swap",
});
const sourceSance = Source_Sans_3({
  subsets: ["latin"],
  variable: "--text",
  weight: ["400", "500", "600", "700", "300"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "YES Africa Foundation | Empowering the Next Generation of African Leaders",
  description:
    "YES Africa Foundation is a youth-focused non-profit organisation empowering young Africans through education, entrepreneurship, mentorship, and skills acquisition. Join us in shaping Africa’s future.",
  keywords: [
    "YES Africa Foundation",
    "youth empowerment Africa",
    "African leadership",
    "entrepreneurship training Africa",
    "skills acquisition",
    "mentorship programs",
    "youth development NGO",
    "education support Africa",
  ],
  authors: [{ name: "YES Africa Foundation" }],
  creator: "YES Africa Foundation",
  publisher: "YES Africa Foundation",
  openGraph: {
    title:
      "YES Africa Foundation | Empowering the Next Generation of African Leaders",
    description:
      "Discover YES Africa Foundation, a youth empowerment NGO dedicated to unlocking the potential of African youths through education, skills, mentorship, and leadership development.",
    url: WEBLINK,
    siteName: "YES Africa Foundation",
    images: [
      {
        url: "https://www.yesafricafoundation.com/logo.png",
        width: 1200,
        height: 630,
        alt: "YES Africa Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YES Africa Foundation | Empowering African Youth",
    description:
      "YES Africa Foundation empowers African youths with education, entrepreneurship, mentorship, and skills acquisition programs.",
    images: ["https://www.yesafricafoundation.com/logo.png"],
    creator: "@yesafricafoundation",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ubuntu.variable} ${sourceSance.variable}`}
    >
      <body>
        <Wrap>{children}</Wrap>
      </body>
    </html>
  );
}
