import Link from "next/link";
import { Plane, UserRound } from "lucide-react";

export default function Header()
{
    return(
        <header className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white">
                <span className="grid size-11 place-items-center rounded-full bg-white text-[#111313] shadow-xl shadow-black/20">
                    <Plane size={21} strokeWidth={2.4} />
                </span>
                <span className="text-2xl font-black">Superflights</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm font-semibold">
                <Link href="/travel-partners" className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white hover:text-[#111313] sm:inline-flex">
                    Travel Partners
                </Link>
                <Link href="/profile" className="inline-flex items-center gap-2 rounded-full bg-[#f7c948] px-4 py-2 text-[#111313] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white">
                    <UserRound size={16} />
                    Login
                </Link>
            </nav>
        </header>
    );
}
