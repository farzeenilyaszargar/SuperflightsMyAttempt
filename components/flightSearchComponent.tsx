"use client";

import { useState, useRef, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameDay, isWithinInterval } from "date-fns";
import { indianAirports } from "./airportList";

type Airport = {
  code: string;
  name: string;
  city: string;
};

const airports = indianAirports;

export default function FlightSearchBar() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [departure, setDeparture] = useState<Airport | null>(null);
  const [arrival, setArrival] = useState<Airport | null>(null);
  const [departureSearch, setDepartureSearch] = useState("");
  const [arrivalSearch, setArrivalSearch] = useState("");
  const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);


  // UI state
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) setShowDepartureDropdown(false);
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) setShowArrivalDropdown(false);
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) setShowCalendar(false);
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) setShowTravelers(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDeparture = airports.filter(
    (a) => a.city.toLowerCase().includes(departureSearch.toLowerCase()) || a.name.toLowerCase().includes(departureSearch.toLowerCase()) || a.code.toLowerCase().includes(departureSearch.toLowerCase())
  );
  const filteredArrival = airports.filter(
    (a) => a.city.toLowerCase().includes(arrivalSearch.toLowerCase()) || a.name.toLowerCase().includes(arrivalSearch.toLowerCase()) || a.code.toLowerCase().includes(arrivalSearch.toLowerCase())
  );

  const swapCities = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const handleSearch = () => {
    if (!departure || !arrival || departure.code === arrival.code || !dates.from || (tripType === "roundtrip" && !dates.to)) {
      alert("Please fill all fields correctly!");
      return;
    }

    console.log({
      tripType,
      departure,
      arrival,
      dates: { from: format(dates.from!, "yyyy-MM-dd"), to: dates.to ? format(dates.to, "yyyy-MM-dd") : null },
      travelers: { adults, children, infants },
    });

    alert("Check console for selected data!");
  };

  const daysInMonth = eachDayOfInterval({ start: startOfMonth(calendarMonth), end: endOfMonth(calendarMonth) });

  const handleDayClick = (day: Date) => {
    if (tripType === "oneway") {
      setDates({ from: day, to: null });
      setShowCalendar(false);
    } else {
      if (!dates.from || (dates.from && dates.to)) {
        setDates({ from: day, to: null });
      } else if (dates.from && !dates.to) {
        if (day < dates.from) setDates({ from: day, to: dates.from });
        else setDates({ ...dates, to: day });
      }
    }
  };

  const isInRange = (day: Date) => {
    if (tripType === "roundtrip" && dates.from && dates.to) {
      return isWithinInterval(day, { start: dates.from, end: dates.to });
    }
    return false;
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Trip Type */}
      <div className="flex space-x-4 mb-4">
        <label className="flex items-center space-x-2">
          <input type="radio" name="tripType" value="oneway" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} />
          <span>One Way</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="tripType" value="roundtrip" checked={tripType === "roundtrip"} onChange={() => setTripType("roundtrip")} />
          <span>Round Trip</span>
        </label>
      </div>

      {/* Main Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Departure */}
        <div className="relative flex-1" ref={departureRef}>
  <button
    className="w-full border border-black rounded px-3 py-2 text-left"
    onClick={() => setShowDepartureDropdown((prev) => !prev)}
  >
    {departure ? `${departure.city} (${departure.code})` : "Select Departure"}
  </button>
  {showDepartureDropdown && (
    <div className="absolute z-10 bg-white border border-black w-full max-h-60 overflow-y-auto mt-1 rounded">
      <input
        type="text"
        placeholder="Search airport"
        className="w-full px-3 py-2 border-b border-black focus:outline-none"
        value={departureSearch}
        onChange={(e) => setDepartureSearch(e.target.value)}
      />
      <ul>
        {filteredDeparture.map((a) => (
          <li
            key={a.code}
            className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
            onClick={() => {
              setDeparture(a);
              setShowDepartureDropdown(false);
            }}
          >
            {a.city} ({a.code})
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

        {/* Swap */}
        <button className="border border-black rounded px-3 py-2 hover:bg-black hover:text-white" onClick={swapCities}>
          ⇄
        </button>

        {/* Arrival */}
        <div className="relative flex-1" ref={arrivalRef}>
  <button
    className="w-full border border-black rounded px-3 py-2 text-left"
    onClick={() => setShowArrivalDropdown((prev) => !prev)}
  >
    {arrival ? `${arrival.city} (${arrival.code})` : "Select Arrival"}
  </button>
  {showArrivalDropdown && (
    <div className="absolute z-10 bg-white border border-black w-full max-h-60 overflow-y-auto mt-1 rounded">
      <input
        type="text"
        placeholder="Search airport"
        className="w-full px-3 py-2 border-b border-black focus:outline-none"
        value={arrivalSearch}
        onChange={(e) => setArrivalSearch(e.target.value)}
      />
      <ul>
        {filteredArrival.map((a) => (
          <li
            key={a.code}
            className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
            onClick={() => {
              setArrival(a);
              setShowArrivalDropdown(false);
            }}
          >
            {a.city} ({a.code})
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

        {/* Calendar */}
        <div className="relative" ref={calendarRef}>
          <input
            type="text"
            readOnly
            placeholder={tripType === "oneway" ? "Select Date" : "Select Dates"}
            className="border border-black rounded px-3 py-2 cursor-pointer w-48"
            onClick={() => setShowCalendar(true)}
            value={
              dates.from
                ? tripType === "oneway"
                  ? format(dates.from, "dd-MMM-yyyy")
                  : dates.to
                  ? `${format(dates.from, "dd-MMM-yyyy")} → ${format(dates.to, "dd-MMM-yyyy")}`
                  : format(dates.from, "dd-MMM-yyyy")
                : ""
            }
          />

          {showCalendar && (
            <div className="absolute z-10 bg-white border border-black p-4 mt-1 rounded w-64">
              <div className="flex justify-between mb-2">
                <button onClick={() => setCalendarMonth(addMonths(calendarMonth, -1))}>&lt;</button>
                <span>{format(calendarMonth, "MMMM yyyy")}</span>
                <button onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}>&gt;</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="font-bold">{d}</div>
                ))}
                {daysInMonth.map((day) => {
                  const selected = isSameDay(day, dates.from!) || (dates.to && isSameDay(day, dates.to));
                  const inRange = isInRange(day);
                  return (
                    <div
                      key={day.toString()}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        selected ? "bg-black text-white" : inRange ? "bg-gray-800 text-white" : ""
                      } hover:bg-black hover:text-white`}
                      onClick={() => handleDayClick(day)}
                    >
                      {format(day, "d")}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Travelers */}
        <div className="relative" ref={travelersRef}>
          <button className="border border-black rounded px-3 py-2 w-48 text-left" onClick={() => setShowTravelers(true)}>
            {adults + children + infants} Traveler{adults + children + infants > 1 ? "s" : ""}
          </button>
          {showTravelers && (
            <div className="absolute z-10 bg-white border border-black p-4 mt-1 rounded w-48 flex flex-col gap-2">
              {["Adults", "Children", "Infants"].map((type) => (
                <div key={type} className="flex justify-between items-center">
                  <span>{type}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="border border-black px-2 rounded"
                      onClick={() => {
                        if (type === "Adults" && adults > 1) setAdults(adults - 1);
                        if (type === "Children" && children > 0) setChildren(children - 1);
                        if (type === "Infants" && infants > 0) setInfants(infants - 1);
                      }}
                    >
                      -
                    </button>
                    <span>{type === "Adults" ? adults : type === "Children" ? children : infants}</span>
                    <button
                      className="border border-black px-2 rounded"
                      onClick={() => {
                        if (type === "Adults") setAdults(adults + 1);
                        if (type === "Children") setChildren(children + 1);
                        if (type === "Infants") setInfants(infants + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
