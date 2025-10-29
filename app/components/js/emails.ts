import { COMPANYNAME } from "./config";
import {
  AttendeeResponseType,
  EventResponseType,
  MailProp,
  MemberResponseType,
  UserResponseType,
} from "./dataTypes";

export const btnStyle =
  "font-weight:600; color:#ffffff; background-color:#05406f; padding:12px 24px; display:block; text-align:center; text-decoration:none;margin:10px 0px;box-sizing: border-box; border-radius:3px";

export const forgotPasswordMessage = (user: UserResponseType): MailProp => {
  return {
    data: [
      {
        to: { email: user.email, name: user.name },

        subject: "Password Reset Request",
        htmlbody: `<p>
      A password reset request was received for your account. If you requested this reset, please follow the link below to set a new password.
      </p>
      <a href="${process.env.NEXT_PUBLIC_SERVER_URL}forgotpassword?token=${user.token}" style="${btnStyle}">Reset Your Password</a>
      <p>If you did not request a password reset, no further action is required. However you can contact customer support for additional steps to secure your account.</p>`,
      },
    ],
  };
};
export const RegistrationMessage = (
  attendee: AttendeeResponseType,
  event: EventResponseType
): MailProp => {
  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    data: [
      {
        to: { email: attendee.email, name: attendee.name },

        subject: `Registration Confirmed: ${event.title}`,

        htmlbody: `
         
            
            <p>Thank you for registering to attend <strong>${event.title}</strong>.</p>
            
            <p>We are excited to have you join us! Below are your registration details:</p>
            
            <ul style="padding-left: 20px;">
              <li><strong>Event:</strong> ${event.title}</li>
              <li><strong>Date:</strong> ${eventDate}</li>

              <li><strong>Id No:</strong> ${attendee.idNo}</li>
            </ul>
            


            

           
          </div>
        `,
      },
    ],
  };
};
export const MembershipMessage = (member: MemberResponseType): MailProp => {
  return {
    data: [
      {
        to: { email: member.email, name: member.name },

        subject: `Welcome to ${COMPANYNAME}`,

        htmlbody: `
         <div>
           <p>We’re excited to have you join <strong>YES Africa Foundation</strong> — a community dedicated to empowering and supporting young people across Africa.</p>

          <p>Together, we’ll open doors to opportunities in entrepreneurship, leadership, digital skills, and more.</p>
<p>Look out for our emails; we’ll keep you updated on what’s ahead.</p>
          </div>
        `,
      },
    ],
  };
};
