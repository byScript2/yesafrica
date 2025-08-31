"use client";

import styles from "./styles.module.scss";
import { Topper, TopperType } from "@/app/components/js/carousel/Carousel";

import { useState } from "react";
import Underline from "@/app/components/js/underline/underline";
import { useClass, useSlideUp } from "@/app/components/js/useslider";
import Image from "next/image";

export default function Body() {
  const data: TopperType = {
    title: "Financial Strategies",
    img: "/assets/call.jpg",

    text: [
      `Our investment strategies are a blend of precision, discipline, and agility. We craft these strategies using a foundation of thorough market analysis, data-driven insights, and decades of collective experience in global markets, all with the goal of capturing opportunities while effectively navigating risk.`,
    ],
  };

  const [start, setStart] = useState(false);
  const strategies = [
    {
      title: "Strategic Growth & Value",
      text: "Our core approach blends the stability of established market leaders with the high-growth potential of innovative disruptors. We invest in globally recognized companies like Apple, Microsoft, and Alphabet, while also taking strategic positions in high-growth companies like Tesla and Shopify. This strategy is guided by a deep understanding of macroeconomic trends and technical analysis to capture gains across both mature and emerging markets.",
      image: "/assets/view.png",
    },
    {
      title: "Fundamental & Long-Term Value",
      text: "We focus on businesses with strong fundamentals, consistent profitability, and proven resilience. Our portfolio includes blue-chip companies such as Berkshire Hathaway and Procter & Gamble, along with promising small-to-mid-cap enterprises that demonstrate sustainable revenue growth. Beyond public equities, we strategically invest in private equity and real estate to ensure long-term stability and performance.",
      image: "/assets/strategy.jpg",
    },
    {
      title: "Innovation & Disruptive Technology",
      text: "To stay ahead of the curve, we allocate capital to companies leading the future of technology, healthcare, and consumer markets. This includes high-potential disruptors like Moderna and Rivian, alongside established innovators like Nvidia and Amazon. Our goal is to balance the upside potential of next-generation businesses with the security of industry leaders.",
      image: "/assets/calculator.jpg",
    },
    {
      title: "Adaptive Risk Management",
      text: "Risk management is central to our philosophy. While equities are the foundation of our portfolio, we diversify across private equity, real estate, and select high-volatility assets like Bitcoin and Ethereum. By balancing high-growth opportunities with stable, income-generating assets, we reduce exposure to market downturns and aim for consistent performance over time.",
      image: "/assets/rep.png",
    },
    {
      title: "High-Conviction & Focused Alpha",
      text: "For clients with a higher risk tolerance, we pursue opportunities in volatile but potentially lucrative markets. This includes crypto assets like Solana and Cardano, as well as emerging businesses in fields like AI and renewable energy. Our active trading approach in forex markets leverages short-term price movements to deliver targeted gains, using strict stop-loss protocols to manage downside risk.",
      image: "/assets/risk.png",
    },
    {
      title: "Quantitative & Data-Driven Approach",
      text: "We use a sophisticated, data-driven approach to optimize our trades. By integrating algorithmic trading systems and proprietary market indicators, our systems are designed to identify and capture momentum in fast-moving stocks, manage exposure in volatile markets, and enhance precision in forex trading. We combine machine learning with human oversight to maintain a competitive edge.",
      image: "/assets/light.png",
    },
    {
      title: "Client-Customized Portfolio",
      text: "Every client's goals and risk tolerance are unique. We build bespoke investment strategies that may prioritize established market leaders like Coca-Cola and Visa, include select growth companies, or blend allocations with alternative assets for diversification. Regular portfolio reviews ensure that your strategy remains aligned with your objectives and that we can effectively respond to market shifts.",
      image: "/assets/shake.png",
    },
    {
      title: "Global Macro & Event-Driven Strategy",
      text: "We actively analyze global macroeconomic indicators and geopolitical events to position our portfolios for significant shifts. This includes adjusting allocations based on interest rate decisions, inflation trends, and international trade policies. By anticipating major market events, we seek to generate alpha from both short-term market reactions and long-term structural changes.",
      image: "/assets/shift.webp",
    },
    {
      title: "Sustainable & ESG Investing",
      text: "We offer strategies that align with environmental, social, and governance (ESG) principles. This involves investing in companies that demonstrate strong corporate responsibility, ethical practices, and a commitment to sustainability. This approach aims to deliver competitive returns while supporting businesses that create a positive impact on the world.",
      image: "/assets/balance.jpg",
    },
  ];

  useClass([{ id: "approach", setter: setStart }]);
  useSlideUp(["strategies"]);
  return (
    <>
      <Topper data={data} />

      <div className={`${styles.main}`}>
        <div className={styles.top}>
          <div className={styles.heading}>
            <h1>Our Fundamental Approach</h1>
            <Underline id="approach" />
          </div>
          <p>{`We don't chase trends; we create frameworks that respond to them. Our strategies are built to align with investor goals and changing market conditions, whether we're navigating short-term volatility or positioning for long-term growth.`}</p>
        </div>
        <div className={styles.strategies} id="strategies">
          {strategies.map((e, i) => (
            <div className={styles.strategy} key={i}>
              <div className={styles.image}>
                <Image src={e.image} alt={e.title} fill />
              </div>
              <div className={styles.text}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
