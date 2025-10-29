import { IconType } from "react-icons";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export const COMPANYNAME = "Y.E.S Africa Foundation";
export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}api/`;

export const accountUrl = `${baseUrl}account/`;
export const signUpUrl = `${accountUrl}signup/`;
export const loginUrl = `${accountUrl}login/`;
export const tokenUrl = `${accountUrl}token/`;
export const forgotPasswordUrl = `${accountUrl}forgotpassword/`;
export const blogUrl = `${baseUrl}blog/`;
export const paymentUrl = `${baseUrl}payment/`;
export const donationUrl = `${baseUrl}donation/`;
export const eventUrl = `${baseUrl}event/`;
export const mediaUrl = `${baseUrl}media/`;
export const attendeeUrl = `${baseUrl}attendee/`;
export const mailerUrl = `${baseUrl}mailer/`;
export const usersUrl = `${baseUrl}users/`;
export const membersUrl = `${baseUrl}members/`;

export const WEBLINK = `https://www.yesafricafoundation.com`;
export const EMAIL = `info@yesafricafoundation.com`;
export const TEL = `+2349043878643`;
export const TEL2 = `+2348033565682`;

export const FILETYPES = ["IMAGE", "VIDEO"];
export const FILESOURCES = ["SITE", "YOUTUBE", "OTHERS"];
export const FILEORIENTATIONS = ["SQUARE", "PORTRAIT", "LANDSCAPE"];
export const MaxFileSize = 2 * 1024 * 1024;

export const Genders: { value: number; text: string }[] = [
  {
    value: 0,
    text: "Female",
  },
  {
    value: 1,
    text: "Male",
  },
];

export const SOCIALS: { Icon: IconType; link: string }[] = [
  {
    Icon: FaInstagram,
    link: `https://www.instagram.com/yesafricaf/`,
  },
  {
    Icon: FaFacebookF,
    link: `https://web.facebook.com/profile.php?id=61578000098386`,
  },
  {
    Icon: AiOutlineYoutube,
    link: `https://www.youtube.com/channel/UCIFP5FmdiPDcV6VybzGeeUg`,
  },
  {
    Icon: FaTiktok,
    link: `https://www.tiktok.com/@yesafricaf?lang=en`,
  },
];

export const HQ = `3B Sobo Arobiodun Street, GRA Ikeja, Lagos, Nigeria.`;

export const ROLES = ["Organizer", "Participant", "Coordinator", "Crew"];
