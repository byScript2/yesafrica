import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import Member from "../member";

export default function Body() {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>{`Shape the leaders of tomorrow`}</h1>
        <Underline2 id="shapetomorrow" />
      </div>
      <div className={styles.container}>
        <p>{`Do you have knowledge, skills, or experience that can guide young people on their journey? Join our
mentorship network and be a voice of wisdom and encouragement to youth seeking direction in
business, career, leadership, or life.`}</p>
        <p>{`Our mentorship opportunities include:`}</p>

        <ul>
          {[
            "One-on-one or group mentoring",
            "Career talks and masterclasses",
            "Advisory support for startups",
            "Emotional and character development",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h3>{`Your story can inspire.`}</h3>
            <h2>{`Your time can impact`}</h2>
            <Underline id="canimpact" />
          </div>
          <p>{`Mentorship changes lives — sometimes, all a young person needs is someone who believes in them.`}</p>
          <p>{`Together, we can give hope. Together, we can build futures.`}</p>
        </div>
        <Member title="Become a Mentor" role="Mentor" />
      </div>
    </div>
  );
}
