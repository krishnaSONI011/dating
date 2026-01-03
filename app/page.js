import Image from "next/image";
import Header from "./components/ui/Header";
import HeroVideo from "./components/Home/HeroVideo";
import ExclusiveModels from "./components/Home/ExclusiveModels";
import TopSearches from "./components/Common/TopSearches";
import EscortsByCity from "./components/Home/EscortsByCity";
import Footer from "./components/ui/Footer";

export default function Home() {
  return (
  <>
  
   <HeroVideo />
   <EscortsByCity />
   <ExclusiveModels />
   
   <TopSearches />
   
  </>
  );
}
