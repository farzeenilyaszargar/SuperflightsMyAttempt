import Link from "next/link";
import { Instagram, Linkedin, Mail, Plane, Twitter } from "lucide-react";

export default function Footer()
{
    return(
        <footer className="border-t border-[#dfd4c4] bg-[#111313] px-5 pt-14 text-white md:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 pb-14 md:grid-cols-[1.1fr_0.8fr_0.7fr]">
                <div>
                    <Link href="/" className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-full bg-[#f7c948] text-[#111313]">
                            <Plane size={21} />
                        </span>
                        <span className="text-2xl font-black">Superflights</span>
                    </Link>
                    <p className="mt-5 max-w-md text-base font-semibold leading-7 text-white/62">
                        A cleaner, calmer flight booking experience for travelers who want speed, style, and zero confusion.
                    </p>
                    <div className="mt-6 flex gap-2">
                        {[
                            { icon: Instagram, label: "Instagram" },
                            { icon: Twitter, label: "Twitter" },
                            { icon: Linkedin, label: "LinkedIn" },
                            { icon: Mail, label: "Email" },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.label} href="/" aria-label={item.label} title={item.label} className="grid size-10 place-items-center rounded-full border border-white/12 text-white/70 transition hover:bg-white hover:text-[#111313]">
                                    <Icon size={18} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text-sm font-black uppercase text-[#f7c948]">Explore</h2>
                    <div className="mt-5 grid gap-3 text-sm font-bold text-white/62">
                        <Link href="/company" className="transition hover:text-white">Company</Link>
                        <Link href="/travel-partners" className="transition hover:text-white">Travel Partners</Link>
                        <Link href="/profile" className="transition hover:text-white">My Trips</Link>
                        <Link href="/tc" className="transition hover:text-white">Terms and Conditions</Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-sm font-black uppercase text-[#f7c948]">Travel desk</h2>
                    <div className="mt-5 space-y-3 text-sm font-bold text-white/62">
                        <p>Delhi, Mumbai, Bengaluru, Goa, Kochi, Jaipur, and more.</p>
                        <p>Support available for bookings, changes, and itinerary help.</p>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 py-6 text-xs font-bold text-white/42 md:flex-row md:items-center md:justify-between">
                <p>Superflights &copy; 2026. Built for smoother departures.</p>
                <p>Privacy Policy / User Agreement / Contact</p>
            </div>
        </footer>
    );
}
