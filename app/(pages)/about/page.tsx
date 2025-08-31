import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";
import styles from "./styles.module.scss";
import { Metadata } from "next";

import Map from "@/app/components/js/map/map";

export const metadata: Metadata = {
  title: "About Us | H.I.G. Equity",
  description:
    "Discover the story behind H.I.G. Equity, our mission, values, and expertise. Learn how we help clients achieve long-term growth through disciplined, diversified, and forward-thinking investment strategies across stocks, private equity, real estate, crypto, forex, ETFs, and more.",
};

export default function About() {
  const top: TopperType = {
    text: [
      "H.I.G. Equity is a leading investment firm dedicated to sustainable capital growth, strategic portfolio management, and value-driven market solutions.",
      "Our expertise spans equities, forex, private equity, real estate, and other asset classes—delivering tailored strategies that align with the unique objectives of our clients.",
    ],
    title: "About H.I.G. Equity",
    img: "/assets/glass.png",
  };

  const difference: { title: string; text: string }[] = [
    {
      title: `Disciplined Strategy`,
      text: `We cut through market noise by relying on tested frameworks, historical insight, and the discipline to remain focused when others are distracted.`,
    },
    {
      title: `Personalized Solutions`,
      text: `Every investor’s journey is unique. We build portfolios aligned with individual goals, timelines, and ambitions, ensuring success is truly personal.`,
    },
    {
      title: `Market Adaptability`,
      text: `In a rapidly changing world, we combine enduring financial principles with advanced analysis to anticipate shifts and capture opportunities.`,
    },
    {
      title: `Transparency First`,
      text: `Trust is earned through clarity. We provide open communication, detailed reporting, and real-time tracking so clients always know where they stand.`,
    },
    {
      title: `Global Perspective`,
      text: `Our outlook extends beyond borders. With insights from international markets, we identify opportunities across sectors and regions, giving investments a truly global reach.`,
    },
  ];

  return (
    <main>
      <Topper data={top} />
      <div className={styles.about}>
        <div className={styles.texts}>
          <h1>{`History of H.I.G. Capital LLC, our parent company.`}</h1>
          <p className="color italics">
            From Private Equity to a Global Alternative Assets Manager
          </p>
          <p>
            {`H.I.G. Capital LLC is a globally recognized private investment firm, with a rich history of strategic growth and diversification. Founded in 1993, the firm has evolved from a focused private equity investor into a major player in the alternative assets landscape, managing a wide range of funds and strategies. Its success is rooted in its original vision and an adaptable, value-creation-driven approach.`}
          </p>
          <h2>{`The Founding Vision (1993-2000)`}</h2>
          <p>
            {`The story of H.I.G. Capital began in 1993 when it was founded by two seasoned financial professionals, Sami Mnaymneh and Tony Tamer. Both had a strong background in finance and consulting, with Mnaymneh having been a Managing Director at The Blackstone Group and Tamer a partner at Bain & Company. They saw a compelling opportunity in the underserved middle market, a segment of companies that were often too small for large private equity firms but too large for traditional venture capital.`}
          </p>
          <p>
            {`Their initial strategy was to acquire small to mid-sized businesses and enhance their value through operational improvements and strategic guidance. This hands-on approach, focused on building stronger, more successful companies, became a cornerstone of the firm's identity. H.I.G. Capital's founders were not just financiers; they were partners who worked closely with management teams to drive growth and profitability. The firm's early success solidified its reputation and enabled it to raise its first institutional fund around the turn of the century.`}
          </p>
          <h2>{`Diversification and Global Expansion (2000s)`} </h2>
          <p>
            {`As H.I.G. Capital matured, it began to broaden its scope beyond traditional buyouts. Recognizing the demand for a variety of investment vehicles, the firm strategically expanded its offerings to include other asset classes. This period was marked by the launch of new, specialized funds and affiliates, each dedicated to a specific investment strategy:`}
          </p>
          <ul>
            <li>
              {`Growth Equity: H.I.G. Growth Partners was established to focus on investments in high-growth, technology-oriented businesses. This affiliate allowed H.I.G. to participate in the rapid expansion of sectors like SaaS, fintech, and e-commerce.`}{" "}
            </li>
            <li>
              {`Credit & Debt: H.I.G. also ventured into the credit markets with the creation of affiliates like Bayside Capital and WhiteHorse Capital. These entities provided direct lending, distressed debt, and other credit-based solutions, offering a more flexible approach to financing for companies and generating returns through a different risk profile. The firm's debt funds invest in various forms of debt financing, from senior to junior loans.`}{" "}
            </li>
            <li>
              {`Real Assets: H.I.G. Realty Partners was formed to manage real estate-focused funds, investing in value-added properties that could benefit from improved asset management and strategic repositioning. This move allowed the firm to capitalize on opportunities within the real estate market.`}{" "}
            </li>
          </ul>
          <p>
            {`A key milestone during this decade was the firm's international expansion. In 2006, H.I.G. Capital established its first European affiliate, H.I.G. Europe, to serve the European market. This was followed by the opening of offices in other major financial centers across the globe, including Latin America. This global footprint gave H.I.G. a competitive advantage in identifying unique opportunities and implementing its value-creation strategies worldwide.`}
          </p>
          <h1>{`Establishment of H.I.G. Equity`}</h1>
          <p>{` In 2016, the firm expanded its vision by creating H.I.G. Equity, a specialised division dedicated to serving the investment needs of both individuals and corporate clients.`}</p>
          <p>
            {`H.I.G. Equity pools and manages capital from the general public, strategically allocating resources across a diverse range of opportunities. These include stocks, private equity, real estate, cryptocurrency and forex markets, as well as large-scale infrastructure projects. By combining disciplined research, risk management, and innovative investment strategies, the firm seeks to deliver consistent long-term growth while providing clients access to markets traditionally reserved for institutional players.`}{" "}
          </p>
          <p>
            {`Built on the foundation of H.I.G. Capital’s global expertise, H.I.G. Equity embodies the mission of making high-quality investment opportunities more accessible, while maintaining the rigorous standards and strategic foresight that define the H.I.G. brand.`}{" "}
          </p>
        </div>
        <section className={styles.container}>
          <div className={styles.group}>
            <h2>Our Mission</h2>
            <p>{`Our mission is to empower investors with strategic, data-driven solutions that transform ambition into sustainable financial growth.`}</p>
          </div>
          <div className={styles.group}>
            <h2>Our Vision</h2>
            <p>{`We strive to set the global benchmark for trusted, intelligent investing, where innovation, expertise, and transparency create lasting value and opportunity for our clients.`}</p>
          </div>
        </section>

        <section className={styles.col}>
          <div className={styles.list}>
            <h2>What Sets Us Apart</h2>
            <div className={styles.items}>
              {difference.map((e, i) => (
                <div key={i} className={styles.item}>
                  <p className={styles.title}>{e.title}</p>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.group}>
            <h2>A Commitment to Clients</h2>
            <p>{`Every investor deserves more than just access—they deserve guidance. Whether you're allocating $500 or $5 million, our approach remains the same: deliberate, informed, and tailored to your objectives.`}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
