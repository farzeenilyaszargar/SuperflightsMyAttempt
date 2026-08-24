import FliSearch from "@/components/flightSearch";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import PopDest from "@/components/popularDestinations";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#111313]">
      <section className="relative min-h-[720px] bg-[url('/bg-1.png')] bg-cover bg-center text-white md:min-h-[760px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,12,.86)_0%,rgba(6,10,12,.54)_46%,rgba(6,10,12,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f4f0e8] to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col px-5 md:min-h-[760px] md:px-8">
          <Header/>
          <Hero/>
          <div className="relative z-20 -mb-20 mt-auto pb-10 md:-mb-24">
            <FliSearch/>
          </div>
        </div>
      </section>
      <PopDest/>
      <Footer/>
    </main>
  );
}
