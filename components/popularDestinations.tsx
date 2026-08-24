import { ArrowUpRight, BadgeCheck, Clock3, ShieldCheck, WalletCards } from "lucide-react";

const destinations = [
    { city: "Goa", code: "GOI", mood: "Beach weekends", fare: "from INR 2,899", color: "bg-[#d7efe7]" },
    { city: "Bengaluru", code: "BLR", mood: "Work trips", fare: "from INR 3,740", color: "bg-[#e9e0f1]" },
    { city: "Jaipur", code: "JAI", mood: "Palace escapes", fare: "from INR 2,450", color: "bg-[#f8e2c2]" },
    { city: "Kochi", code: "COK", mood: "Slow coast", fare: "from INR 3,120", color: "bg-[#dbe9f6]" },
];

const promises = [
    { icon: WalletCards, title: "Live fare sense", body: "Compare practical prices, cabin options, and timing without hunting through tabs." },
    { icon: Clock3, title: "Fast checkout flow", body: "Keep passenger details, trip choices, and fare picks moving in one focused path." },
    { icon: ShieldCheck, title: "Clear trip control", body: "Review baggage, date flexibility, and route details before you commit." },
];

export default function PopDest()
{
    return(
        <section className="px-5 pb-20 pt-32 md:px-8 md:pt-40">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                    <div>
                        <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-[#146c6c]">
                            <BadgeCheck size={17} />
                            Handpicked routes
                        </p>
                        <h2 className="max-w-xl text-4xl font-black leading-tight text-[#111313] md:text-6xl">
                            Where everyone is flying next.
                        </h2>
                        <p className="mt-5 max-w-lg text-lg font-semibold leading-8 text-[#5f5a53]">
                            Weekend plans, business dashes, family visits, and sun-soaked escapes, shaped into easy route cards.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {destinations.map((destination) => (
                            <article key={destination.code} className={`${destination.color} group min-h-56 rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-black text-[#5f5a53]">{destination.mood}</p>
                                        <h3 className="mt-2 text-4xl font-black text-[#111313]">{destination.city}</h3>
                                    </div>
                                    <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-black text-[#111313]">{destination.code}</span>
                                </div>
                                <div className="mt-12 flex items-end justify-between">
                                    <p className="text-lg font-black text-[#111313]">{destination.fare}</p>
                                    <span className="grid size-11 place-items-center rounded-full bg-[#111313] text-white transition group-hover:rotate-45">
                                        <ArrowUpRight size={20} />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-16 grid gap-4 md:grid-cols-3">
                    {promises.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-[1.5rem] border border-[#dfd4c4] bg-[#fbfaf7] p-6">
                                <span className="grid size-12 place-items-center rounded-full bg-[#111313] text-white">
                                    <Icon size={21} />
                                </span>
                                <h3 className="mt-5 text-xl font-black text-[#111313]">{item.title}</h3>
                                <p className="mt-3 text-sm font-semibold leading-6 text-[#686058]">{item.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
