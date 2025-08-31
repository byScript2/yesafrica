import axios from "axios";
import { MailProp } from "./dataTypes";
import { COMPANYNAME, EMAIL } from "./config";

const url = "https://api.zeptomail.com/v1.1/email";
const logo =
  "https://firebasestorage.googleapis.com/v0/b/loliter-6bb20.appspot.com/o/Y.E.S.%2Fcorporate%2Flogo.PNG?alt=media&token=9b428e8e-b49d-451c-a360-0ad43de2a452";

export const sendMail = async (details: MailProp) => {
  const sender: { name: string; email: string } = {
    name: COMPANYNAME,
    email: EMAIL,
  };
  try {
    const { data } = details;

    const token = `Zoho-enczapikey wSsVR60nqUX5Cah7yjOoLrw/ygkHDwnyHBgv0VKgvyf8TPiX/cc6wkWcV1SkFKMZF247Fjoa9ul7kEgD1jYPhowszglWDiiF9mqRe1U4J3x17qnvhDzPXmRVkxSNLY0PwgRrk2RiEc4j+g==`;

    for (let i = 0; i < data.length; i++) {
      const { htmlbody, subject, to } = data[i];
      const message = `
  <div style="background-color:#f9fafb;color:#1a1a1a; font-family: Open Sans, sans-serif ">
 <div style="text-align:center; padding: 20px;">
  <img src="${logo}" style="height:99px; width:150px" />
    </div>
  <div style="padding: 24px; background:#fff;color:#1a1a1a;font-size:0.9rem">
  <h3>${subject}</h3>
     <p>Hello ${to.name[0].toUpperCase()}${to.name
        .substring(1)
        .toLowerCase()},</p>
    ${htmlbody}
    </div>
     <div style="padding: 12px 80px; background:#f4f5f7;color:#000000;font-size:0.8rem; text-align:center">
     <p>For support and assistance please contact us at ${EMAIL}</p>
    <p> &copy; ${COMPANYNAME}</p>
    </div>
    </div>
 `;
      await axios.post(
        url,
        {
          to: [
            {
              email_address: {
                address: to.email,
                name: to.name,
              },
            },
          ],
          subject,
          htmlbody: message,
          from: {
            address: sender.email,
            name: sender.name,
          },
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
