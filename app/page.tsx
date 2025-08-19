import FliSearch from "@/components/flightSearch";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import PopDest from "@/components/popularDestinations";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="h-fit w-screen bg-[url('/bg-1.png')] bg-center bg-cover relative">
        <div className="z-20 relative">
          <Header/>
          <Hero/>
          <div className="absolute -mt-10">
            <FliSearch/>
          </div>
        </div>
        
        <div className="absolute top-0 w-screen h-full z-10 opacity-50 bg-black">
        </div>
      </div>
      <PopDest/>
      <Footer/>
    </div>
  );
}
