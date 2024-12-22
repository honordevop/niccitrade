import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeTable from "@/components/HomeTable";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <Banner />
      <div className="w-full">
        <HomeTable />
      </div>
      <Footer />
    </div>
  );
}
