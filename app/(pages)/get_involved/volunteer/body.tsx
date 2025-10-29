import Underline, { Underline2 } from "@/app/components/js/underline/underline";
import styles from "../styles.module.scss";

import Member from "../member";

export default function Body() {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Be the change you want to see!</h1>
        <Underline2 id="changeyousee" />
      </div>
      <div className={styles.container}>
        <p>{`Join our growing network of passionate volunteers who are dedicated to empowering young people
across communities. Whether you’re a professional, student, creative, or simply someone with a heart to
serve — your time, skills, and energy can make a real difference.`}</p>
        <p>{`Our volunteer opportunities include:`}</p>
        <ul>
          {[
            "Event coordination and logistics",
            "Community outreach and sensitization",
            "Media and content creation",
            "Admin and program support",
            "Mentorship and training facilitation",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <p>{`As a volunteer, you can:`}</p>
        <ul>
          {[
            "Support events and outreach programs",
            "Facilitate training or mentorship sessions",
            "Help with administrative or creative tasks",
            "Become a brand ambassador in your local community",
          ].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h3>{`You don’t need to be perfect`}</h3>
            <h2>{`just willing`}</h2>
            <Underline id="notperfect" />
          </div>
          <p>{`Why volunteer? Volunteering allows you to gain valuable experience, grow your network, and contribute to a cause that shapes the future of Africa—one youth at a time. With every opportunity, we provide orientation, support, and room to grow, ensuring your journey is as rewarding as it is impactful. Make your time count and volunteer with purpose.`}</p>
        </div>
        <Member title="Join Our Volunteer Team" role="Volunteer" />
      </div>
    </div>
  );
}
