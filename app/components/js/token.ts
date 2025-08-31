import jwt from "jsonwebtoken";
import {
  AttendeeResponseType,
  DonationResponseType,
  UserResponseType,
} from "./dataTypes";
const verifyToken = (token: string): UserResponseType =>
  jwt.verify(token, `${process.env.SECRET}`) as UserResponseType;

export const makeToken = (user: UserResponseType): UserResponseType => {
  const { password, ...other } = user;

  const mToken = jwt.sign(other, `${process.env.SECRET}`, {
    expiresIn: "12h",
  });

  const userToReturn: UserResponseType = {
    ...other,
    password: "",
    token: mToken,
  };
  return userToReturn;
};
export const makePaymentToken = (
  data:
    | {
        name: string;
        purpose: string;
        amount: number;
      }
    | AttendeeResponseType
) => {
  const mToken = jwt.sign(data, `${process.env.SECRET}`, {
    expiresIn: "12h",
  });

  return mToken;
};
interface PaymentType extends AttendeeResponseType {
  amount: number;
}
export const verifyPaymentToken = (token: string) =>
  jwt.verify(token, `${process.env.SECRET}`) as PaymentType;

export function makeAbbreviation(title: string): string {
  if (!title) return "";

  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
export function makeId(eventName: string, length = 5) {
  let password = makeAbbreviation(eventName);
  const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
}

export default verifyToken;
