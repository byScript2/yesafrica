import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import Member from "../member";

export default function Body() {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>{`Let's do more together!`}</h1>
        <Underline2 id="domoretogether" />
      </div>
      <div className={styles.container}>
        <p>{`At YES Africa Foundation, we believe in the power of collaboration. Whether you're a business,
Government Agency, Media Organization, Educational institution, NGO, we are open to strategic
partnerships that amplify youth empowerment and drive sustainable development. We welcome
partnership in areas such as:`}</p>

        <ul>
          {[
            "Joint projects or campaigns",
            "Internship/job placement for youth",
            "Training content or workshop support",
            "Event sponsorship or co-hosting",
            "Corporate social responsibility (CSR) alignment",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <h3>{`Together, We Can Do More.`}</h3>

        <p>{`Let’s build solutions that last, hand in hand.`}</p>
        <ul>
          {[
            "Expand access to youth-focused programs",
            "Co-create training modules or workshops",
            "Provide internships or job placement",
            "Host joint conferences or empowerment events",
            "Align with your CSR or impact goals",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h2>{`Your brand. Our mission. Shared success.`}</h2>
            <Underline id="contribution" />
          </div>
          <p>{`Imagine what we can do together!`}</p>
        </div>
        <Member title="Become a Partner" role="Partner" />
      </div>
    </div>
  );
}
