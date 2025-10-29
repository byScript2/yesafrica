import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import Member from "../member";

export default function Body() {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Help us turn dreams into reality!</h1>
        <Underline2 id="dreamstoreality" />
      </div>
      <div className={styles.container}>
        <p>{`Sponsorship is one of the most impactful ways to support our mission. By sponsoring a specific
program — such as a skill acquisition bootcamp, scholarship initiative, or entrepreneurship training —
you directly invest in a young person’s growth, education, and future.`}</p>
        <p>{`You can choose to:`}</p>
        <ul>
          {[
            "Sponsor one or more beneficiaries",
            "Fund equipment or materials for a program",
            "Support a specific training cohort or campaign",
            "Donate toward operational or logistics costs",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h2>{`Every contribution counts.`}</h2>
            <Underline id="contribution" />
          </div>
          <p>{`Let your giving transform lives, create jobs, and uplift entire communities.`}</p>
        </div>
        <Member title="Become a Sponsor" role="Sponsor" />
      </div>
    </div>
  );
}
