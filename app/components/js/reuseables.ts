import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { postRequest } from "./api_client";
import { tokenUrl } from "./config";

const handleProtected = async (admin: boolean = false, vot?: string) => {
  const nextCookies = await cookies();

  const token = vot || nextCookies.get("token")?.value;

  if (!token) redirect("/login");
  const { data, success } = await postRequest(tokenUrl, { token }, token);

  if (!success) redirect("/login");
  // if (!data.verified) {
  //   redirect(`/verify_email?vot=${vot}`);
  // }
  if (admin && data.role < 1) {
    redirect("/dashboard");
  }
  return token;
};

export const handleAuthorization = async () => {
  const nextCookies = await cookies();

  const token = nextCookies.get("token")?.value;

  if (!token) return;
  const { success } = await postRequest(tokenUrl, { token }, token);
  if (success) redirect("/dashboard");
};

export default handleProtected;
