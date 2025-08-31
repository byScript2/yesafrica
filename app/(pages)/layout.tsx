import { ReactNode } from "react";
import Nav from "./nav/Nav";
import Footer from "./footer/footer";
import Whatsapp from "../components/js/whatsapp/whatsapp";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <Whatsapp />
      <main>{children}</main>

      <Footer />
    </>
  );
}
