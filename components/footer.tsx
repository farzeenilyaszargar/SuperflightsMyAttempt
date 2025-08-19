import Image from "next/image";
import Link from "next/link";

export default function Footer()
{
    return(
        <div className=" flex flex-col justify-center items-center border-t ">
            <div className=" w-screen h-fit  flex flex-row  justify-center mt-10 mb-10 gap-10 ">
                <div className="  w-1/4 flex flex-col p-3">
                    <h1  className="font-black text-2xl mb-3">About</h1>
                    <p className="text-zinc-600 text-justify mr-5">ajdfhdjs hjkds fk jdshfkj dsjk f  akdsjh dksaj hdkjas hkdjas ddskdfddsan das daksj dkas dakjs hksjd ahksj dkjahd
                        asdsajkhdkasj hdkasjhdks ajhdk asjdk ashkj dhsakj
                          kashdk jah skjdh. kajshdkashk dahskdjskashdk jah skjdh. kajshdkashk dahskdjs
                          kashdk jah skjdh. kajshdkashk dahskdjs kashdk jah skjdh. kajshdkashk dahskdjs 
                    </p>
                </div>
                <div className="  w-1/4 p-3 flex flex-col text-xl ">
                    
                    <h1 className="font-black text-2xl">Links</h1>
                    <Link href={'/company'} className="text-zinc-500 hover:text-black mt-1">Company</Link>
                    <Link href={'/pp'} className="text-zinc-500 hover:text-black mt-1">Privacy Policy</Link>
                    <Link href={'/tc'} className="text-zinc-500 hover:text-black mt-1">Terms and Conditions</Link>
                    <Link href={'/tc'} className="text-zinc-500 hover:text-black mt-1">User Agreement</Link>
                    <Link href={'/tc'} className="text-zinc-500 hover:text-black mt-1">Frequently Asked Questions</Link>
                    <Link href={'/tc'} className="text-zinc-500 hover:text-black mt-1">Contact Us</Link>


                </div>
                <div className=" flex flex-row justify-center  w-1/8 p-3 items-center ">
                    <h1>Socials:  </h1>

                    <Link href={'www.instagram.com/superflights.co.in'}><Image src={'/icons/insta.svg'} alt="insta" width={25} height={25} className="hover:scale-110"/></Link>
                    <Link href={'www.twitter.com/superflights.co.in'}><Image src={'/icons/x.svg'} alt="x" width={25} height={25} className="hover:scale-110"/></Link>
                    <Link href={'www.linkedin.com/superflights.co.in'}><Image src={'/icons/linkedin.svg'} alt="lin" width={25} height={25} className="hover:scale-110"/></Link>

                    
                </div>
                
            </div>
            
            <div className="  font-black text-4xl overflow-hidden md:h-17 h-5 flex justify-center items-start">
                <p className="md:text-9xl bg-gradient-to-b from-black to-white bg-clip-text text-transparent">SUPERFLIGHTS</p>
                <span className="md:text-2xl">©</span>
            </div>
                
            
        </div>
    );
}