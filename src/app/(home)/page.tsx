import Benefit from "./components/Benefit";
import HeroSection from "./components/HeroSection";
import ListFilter from "./components/ListFilterDonation";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ListFilter />
      <Benefit />
    </>
  );
}
