import { initializeApp, getApps } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { COMPANYNAME } from "./config";
import { getAnalytics, isSupported } from "firebase/analytics";
const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const app = !getApps().length ? initializeApp(config) : getApps()[0];
export const storage = getStorage(app);
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { analytics };

export const uploadFile = async (
  title: string,
  parent: string = "form"
): Promise<string[]> => {
  const parentDiv = document.getElementById(`${parent}`);
  const children = parentDiv!.querySelectorAll("input[type=file]");
  const urls: string[] = [];
  for (let i = 0; i < children?.length; i++) {
    const image = children[i] as HTMLInputElement;
    const contImg = image.getAttribute("aria-describedby");
    if (image.files && image.files[0]) {
      const imgRef = ref(
        storage,
        `/${
          COMPANYNAME.replaceAll(".", "").split(" ")[0]
        }/images/${title}/${title}${i}`
      );
      await uploadBytes(imgRef, image.files[0]);
      const url = await getDownloadURL(imgRef);
      urls.push(url);
    } else if (contImg) {
      urls.push(contImg);
    }
  }
  return urls;
};

export const deleteFile = async (title: string, fileLen: number) => {
  try {
    for (let i = 0; i < fileLen; i++) {
      const fileRef = ref(
        storage,
        `/${COMPANYNAME.split(" ")[0]}/images/${title}/${title}${i}`
      );
      await deleteObject(fileRef);
    }
  } catch (error) {
    console.log(error);
  }
};
