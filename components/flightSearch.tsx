import FlightSearch from "./flightSearchComponent";

export default function FliSearch()
{
    return(
        <div className="w-full">
            <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/60 bg-white/92 shadow-[0_30px_90px_rgba(21,25,29,0.22)] backdrop-blur-xl">
                <FlightSearch/>
            </div>
        </div>
    );
}
