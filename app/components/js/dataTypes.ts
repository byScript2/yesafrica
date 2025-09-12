interface EveryResponseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface UserResponseType extends EveryResponseType {
  email: string;
  role: 0 | 1 | 2;
  token: string;
  name: string;
  oNames: string;
  password: string;
  tel: string;
}
export interface EventResponseType extends EveryResponseType {
  title: string;
  desc: string;
  date: number;
  regCloseDate: number;
  banner: string;
  images: string[];
  max: number;
  body: string;
  fee: number;
  hidden: boolean;
}
export interface BlogResponseType extends EveryResponseType {
  title: string;
  desc: string;
  banner: string;
  images: string[];
  body: string;
  authorId: string;
  author: UserResponseType;
}
export interface MediaResponseType extends EveryResponseType {
  title: string;
  src: string;
  desc: string;
  type: "PDF" | "IMAGE" | "VIDEO";
  source: "SITE" | "YOUTUBE" | "OTHERS";
  orientation: "PORTRAIT" | "LANDSCAPE" | "SQUARE";
}
export interface AttendeeResponseType extends EveryResponseType {
  email: string;
  name: string;
  eventId: string;
  role: string;
  tel: string;
  image: string;
  idNo: string;
  reference: string;
  event: EventResponseType;
}
export interface DonationResponseType extends EveryResponseType {
  name: string;
  tel: string;
  purpose: string;
  amount: number;
}

export interface MassEmailProp {
  email: string;
  name: string;
}
export interface MailProp {
  data: {
    to: MassEmailProp;
    subject: string;
    htmlbody: string;
  }[];
  pathName?: string;
}

export interface FaqTypes {
  q: string;
  a: string;
}
