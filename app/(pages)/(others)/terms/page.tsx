import styles from "../style.module.scss";
export default function Page() {
  const texts = [
    {
      title: "Acceptance of Terms",
      text: [
        "By using this platform, you agree to our terms and conditions. If you don't agree, please don't use our service.",
      ],
    },
    {
      title: "Eligibility",
      text: [
        "To use this platform, you must be at least 18 years old and able to legally enter into contracts.",
      ],
    },
    {
      title: "Investment Risk",
      text: [
        "All investments come with a risk. Please remember that past results do not guarantee future performance.",
        "H.I.G. Equity is not responsible for any financial losses that may occur from your investment decisions on this platform.",
      ],
    },
    {
      title: "Account Responsibility",
      text: [
        "You are responsible for keeping your login credentials confidential.",
        "You agree to notify us immediately if you suspect any unauthorized activity on your account.",
      ],
    },
    {
      title: "Use of Platform",
      text: [
        "You agree to only use our platform for legal purposes and in a way that follows all applicable regulations.",
        "You may not attempt to interfere with the platform's functionality or security.",
      ],
    },
    {
      title: "Privacy Policy",
      text: [
        "We handle your personal data according to our Privacy Policy, which explains how we collect, store, and use your information.",
      ],
    },
    {
      title: "Modification of Terms",
      text: [
        "We can update or change these terms at any time. Your continued use of the platform after any changes means you accept the new terms.",
      ],
    },
    {
      title: "Termination",
      text: [
        "We reserve the right to suspend or end your access to the platform at our discretion, with or without notice, if you violate these terms or any applicable laws.",
      ],
    },
    {
      title: "Governing Law",
      text: [
        "These terms and conditions are governed by and interpreted in accordance with the laws of the United States of America.",
      ],
    },
    {
      title: "Contact Us",
      text: [
        "If you have any questions about these terms, please contact us via the support page or email listed in the Contact section.",
      ],
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Terms and Conditions</h1>
        <h2>Last Updated: November 2024</h2>

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
