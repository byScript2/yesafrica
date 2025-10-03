import styles from "../style.module.scss";
export default function Page() {
  const texts: { title: string; text: string }[] = [
    {
      title: "Acceptance of Terms",
      text: "By accessing and using the Y.E.S. Africa Foundation website, you agree to comply with these Terms of Use and all applicable laws and regulations.",
    },
    {
      title: "Use of Content",
      text: "All information, materials, and resources on this site are the property of Y.E.S. Africa Foundation unless otherwise stated. You may view, share, or download content for personal and non-commercial use only, provided you acknowledge the source.",
    },
    {
      title: "Programme Participation",
      text: "Participation in our programmes, events, or initiatives is subject to eligibility requirements and the Foundation’s guidelines. We reserve the right to accept or decline applications at our discretion.",
    },
    {
      title: "Consent to Recording and Media Use",
      text: "By attending training sessions or programme-related activities, you hereby grant Y.E.S. Africa Foundation and its authorized partners the unrestricted right to: (1) record, photograph, and document your participation; (2) use your name, business name, logo, images, testimonials, videos, and any media content generated during the programme for internal reports, media releases, website features, social media posts, and other promotional activities; and (3) share success stories or outcomes from your business journey as part of the programme’s public impact communication. You understand that you will not be entitled to any compensation for the use of this content and that all materials will be used in line with the Foundation’s brand and communications standards.",
    },
    {
      title: "Donations",
      text: "Donations made to Y.E.S. Africa Foundation are voluntary and non-refundable. Funds will be allocated to support our mission, programmes, and operations in the best interest of our beneficiaries.",
    },
    {
      title: "User Conduct",
      text: "Visitors and participants are expected to engage respectfully with our community. Any misuse of the website, abusive behaviour, or unlawful activity may result in restricted access or legal action.",
    },
    {
      title: "External Links",
      text: "Our website may contain links to external sites. Y.E.S. Africa Foundation does not endorse and is not responsible for the content, services, or practices of third-party websites.",
    },
    {
      title: "Privacy",
      text: "We value your privacy and handle personal data in accordance with our Privacy Policy. By using our website, you consent to the collection and use of information as outlined therein.",
    },
    {
      title: "Changes to Terms",
      text: "Y.E.S. Africa Foundation may update these Terms of Use at any time. Continued use of our website and services constitutes acceptance of any revised terms.",
    },
    {
      title: "Governing Law",
      text: "These Terms shall be governed by and construed in accordance with the laws applicable in our country of registration, without regard to conflict of law principles.",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Terms and Conditions</h1>
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
