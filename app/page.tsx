import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Glance from "@/components/sections/Glance";
import HowItWorks from "@/components/sections/HowItWorks";
import Fairness from "@/components/sections/Fairness";
import AboutTeaser from "@/components/sections/AboutTeaser";
import PrizesTeaser from "@/components/sections/PrizesTeaser";
import RulesTeaser from "@/components/sections/RulesTeaser";
import FaqPreview from "@/components/sections/FaqPreview";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Glance />
        <HowItWorks />
        <Fairness />
        <AboutTeaser />
        <PrizesTeaser />
        <RulesTeaser />
        <FaqPreview />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
