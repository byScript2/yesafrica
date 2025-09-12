import { COMPANYNAME } from "@/app/components/js/config";
import styles from "../style.module.scss";
export default function Page() {
  const texts: { title: string; text: string }[] = [
    {
      title: "General Information",
      text: "The content on this website is provided by Y.E.S. Africa Foundation for general informational and educational purposes only. While we strive for accuracy, we make no warranties or guarantees about the completeness or reliability of any information shared.",
    },
    {
      title: "No Professional Advice",
      text: "The materials and resources provided by Y.E.S. Africa Foundation should not be interpreted as legal, financial, medical, or professional advice. Visitors are encouraged to seek independent professional guidance where necessary.",
    },
    {
      title: "External Links",
      text: "Our website may include links to external websites or resources. Y.E.S. Africa Foundation is not responsible for the content, accuracy, or practices of third-party sites and does not necessarily endorse the views expressed therein.",
    },
    {
      title: "Use of Donations",
      text: "All donations made to Y.E.S. Africa Foundation are used to support our programmes, initiatives, and operational needs in line with our mission. While we commit to transparency, we reserve the right to allocate resources where they are most needed.",
    },
    {
      title: "Limitation of Liability",
      text: "Y.E.S. Africa Foundation will not be held liable for any losses, damages, or inconveniences arising from the use of our website, participation in our programmes, or reliance on any information provided here.",
    },
    {
      title: "Policy Updates",
      text: "This disclaimer may be updated from time to time to reflect changes in our operations or regulatory requirements. We encourage visitors to review it periodically for the latest information.",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Disclaimer: {COMPANYNAME}</h1>

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
