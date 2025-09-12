import styles from "../style.module.scss";
export default function Page() {
  const texts: { title: string; text: string }[] = [
    {
      title: "Introduction",
      text: "Y.E.S. Africa Foundation is committed to protecting the privacy and personal information of our beneficiaries, donors, volunteers, and visitors. This Privacy Policy explains how we collect, use, and safeguard your data.",
    },
    {
      title: "Information We Collect",
      text: "We may collect personal information such as your name, email address, phone number, payment details, and other relevant data when you interact with our website, register for programmes, make donations, or subscribe to our updates.",
    },
    {
      title: "How We Use Your Information",
      text: "The information we collect is used to process donations, manage programme participation, communicate updates, improve our services, and ensure transparency in our operations. We do not sell or rent your personal information to third parties.",
    },
    {
      title: "Data Security",
      text: "We implement appropriate technical and organisational measures to safeguard your personal information against unauthorised access, disclosure, alteration, or misuse. However, no system is completely secure, and we cannot guarantee absolute security.",
    },
    {
      title: "Sharing of Information",
      text: "We may share limited personal information with trusted service providers or partners who assist us in carrying out our activities. These third parties are obligated to maintain the confidentiality and security of your information.",
    },
    {
      title: "Cookies and Tracking",
      text: "Our website may use cookies and similar technologies to enhance user experience, analyse traffic, and improve our services. You can adjust your browser settings to refuse cookies, but this may affect site functionality.",
    },
    {
      title: "Your Rights",
      text: "You have the right to access, correct, or request the deletion of your personal information held by us. You may also opt out of receiving our communications at any time by following the unsubscribe link in our emails.",
    },
    {
      title: "Children’s Privacy",
      text: "We do not knowingly collect personal information from children under the age of 13 without parental consent. If we become aware that such data has been collected, we will take steps to delete it promptly.",
    },
    {
      title: "Policy Updates",
      text: "Y.E.S. Africa Foundation may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this page regularly for the latest updates.",
    },
    {
      title: "Contact Us",
      text: "If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact Y.E.S. Africa Foundation through the details provided on our Contact page.",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <h2>Last Updated: September 2025</h2>

        {texts.map((e, i) => (
          <div key={i}>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
