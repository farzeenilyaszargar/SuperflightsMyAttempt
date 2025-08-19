import Link from "next/link";

export default function Header()
{
    return(
        <div className=" h-18 flex justify-center items-center w-screen text-white">
            <div className="md:ml-22 md:mr-22 ml-10 mr-10 flex justify-between items-center w-screen">
                <div>
                    <Link href={'/'} className="italic font-extrabold text-2xl tracking-tighter">Superflights</Link>
                </div>
                <div>
                    <Link href={'/travel-partners'} className="pl-2 pr-2 md:m-2 border rounded-xl hover:bg-white hover:text-black">Travel Partners</Link>
                    <Link href={'profile'} className="pl-2 pr-2 md:m-2 hover:underline">Login</Link>
                </div>
            </div>
            
        </div>
    );
}