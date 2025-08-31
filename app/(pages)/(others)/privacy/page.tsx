import { COMPANYNAME, EMAIL } from "@/app/components/js/config";
import styles from "../style.module.scss";
export default function Page() {
  const texts = [
    {
      title: "Information We Collect",
      text: [
        "We collect different kinds of information when you use our website and banking services. This includes:",
        "Personal Information: We collect details you share when you sign up for an account, make an investment, or use our services. This includes your name, email, and contact information.",
        "Financial Information: To handle your transactions, we collect financial details like wallet addresses. This information is kept safe and is only used for processing your transactions.",
        "Usage Data: We automatically collect data about how you use our website, such as your IP address, device type, browser, and what you click on. This helps us make our services better for you.",
      ],
    },
    {
      title: "How We Use Your Information",
      text: [
        "Providing Services: We use your personal information to give you access to our services, process your transactions, and manage your account.",
        "Communication: We may use your contact information to send you updates about your investments, service changes, and other important information.",
        "Analytics: We analyze your usage data to understand how our website is used and to improve our services.",
      ],
    },
    {
      title: "Sharing Your Information",
      text: [
        "Third-Party Service Providers: We might share your personal information with other companies that help us run our services, like payment processors or customer support teams.",
        "Legal Compliance: We may have to share your information to follow the law, respond to official requests, or cooperate with legal authorities.",
      ],
    },
    {
      title: "Data Security",
      text: [
        "We use strong security measures to protect your personal information from being accessed or shared without permission. We regularly check and update our security to keep your data safe.",
      ],
    },
    {
      title: "Your Choices",
      text: [
        `You have the right to look at, correct, or delete your personal information. You can also choose to stop receiving our promotional emails. If you have any questions or concerns, please contact us at ${EMAIL}.`,
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      text: [
        "We may update this Privacy Policy to reflect changes in how we handle data or to meet new legal requirements. We will post the updated policy on our website, so please check back from time to time.",
      ],
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Privacy Policy of {COMPANYNAME}</h1>
        <h2>Last Updated: November 2023</h2>
        <div>
          <p>{`${COMPANYNAME} ("we," "our," or "the Company") is committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you access or use our website and services.`}</p>
        </div>
        {texts.map((e, i) => (
          <div key={i}>
            <h3>{e.title}</h3>
            {e.text.map((k, j) => (
              <p key={j}>{k}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
