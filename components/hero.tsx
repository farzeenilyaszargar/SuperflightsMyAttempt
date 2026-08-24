export default function Hero()
{
    return(
        <div className="flex flex-1 flex-col justify-center pb-28 pt-8 md:max-w-3xl md:pb-36">
            <p className="mb-5 w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase text-[#f7c948] backdrop-blur">
                Fly smarter
            </p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.95] md:text-8xl">
                Flights that feel first class before takeoff.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/82 md:text-xl">
                Search India&apos;s favorite routes, compare slick fare options, and book your next escape in one smooth flow.
            </p>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm font-bold text-white/90">
                <div className="border-l border-white/30 pl-4">
                    <span className="block text-3xl font-black text-white">60+</span>
                    Indian airports
                </div>
                <div className="border-l border-white/30 pl-4">
                    <span className="block text-3xl font-black text-white">24/7</span>
                    fare scanning
                </div>
                <div className="border-l border-white/30 pl-4">
                    <span className="block text-3xl font-black text-white">0</span>
                    booking drama
                </div>
            </div>
        </div>
    );
}
