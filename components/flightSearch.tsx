import Link from "next/link";
import FlightSearch from "./flightSearchComponent";

export default function FliSearch()
{
    return(
        <div className=" w-screen flex justify-center">
            <div className="bg-white md:ml-22 md:mr-22 ml-10 mr-10  rounded-2xl  w-full h-fit">
                <FlightSearch/>
            </div>
        </div>
    );
}