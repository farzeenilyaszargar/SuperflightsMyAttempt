"use client";

import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfMonth,
} from "date-fns";
import {
  ArrowRightLeft,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleMinus,
  CirclePlus,
  MapPin,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { indianAirports } from "./airportList";

type Airport = {
  code: string;
  name: string;
  city: string;
};

type SearchResult = {
  route: string;
  dates: string;
  passengers: number;
  tripType: "oneway" | "roundtrip";
};

const airports = indianAirports;

const dealCards = [
  { label: "Fastest", airline: "Vistara", time: "2h 10m", price: "INR 4,280" },
  { label: "Best value", airline: "IndiGo", time: "2h 25m", price: "INR 3,740" },
  { label: "Luxe cabin", airline: "Air India", time: "2h 20m", price: "INR 5,190" },
];

function travelerLabel(total: number) {
  return `${total} Traveler${total > 1 ? "s" : ""}`;
}

export default function FlightSearchBar() {
  const defaultDepartureDate = addDays(new Date(), 24);
  const defaultReturnDate = addDays(defaultDepartureDate, 5);

  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
  const [departure, setDeparture] = useState<Airport | null>(airports[0]);
  const [arrival, setArrival] = useState<Airport | null>(airports[2]);
  const [departureSearch, setDepartureSearch] = useState("");
  const [arrivalSearch, setArrivalSearch] = useState("");
  const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({
    from: defaultDepartureDate,
    to: defaultReturnDate,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(defaultDepartureDate);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) {
        setShowDepartureDropdown(false);
      }
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) {
        setShowArrivalDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDeparture = useMemo(
    () =>
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(departureSearch.toLowerCase()) ||
          airport.name.toLowerCase().includes(departureSearch.toLowerCase()) ||
          airport.code.toLowerCase().includes(departureSearch.toLowerCase()),
      ),
    [departureSearch],
  );

  const filteredArrival = useMemo(
    () =>
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(arrivalSearch.toLowerCase()) ||
          airport.name.toLowerCase().includes(arrivalSearch.toLowerCase()) ||
          airport.code.toLowerCase().includes(arrivalSearch.toLowerCase()),
      ),
    [arrivalSearch],
  );

  const totalTravelers = adults + children + infants;
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(calendarMonth),
    end: endOfMonth(calendarMonth),
  });
  const calendarOffset = getDay(startOfMonth(calendarMonth));

  const swapCities = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const handleDayClick = (day: Date) => {
    if (tripType === "oneway") {
      setDates({ from: day, to: null });
      setShowCalendar(false);
      return;
    }

    if (!dates.from || dates.to) {
      setDates({ from: day, to: null });
      return;
    }

    setDates(day < dates.from ? { from: day, to: dates.from } : { from: dates.from, to: day });
  };

  const isInRange = (day: Date) => {
    if (tripType === "roundtrip" && dates.from && dates.to) {
      return isWithinInterval(day, { start: dates.from, end: dates.to });
    }
    return false;
  };

  const dateValue = () => {
    if (!dates.from) return "Choose dates";

    if (tripType === "oneway") {
      return format(dates.from, "dd MMM yyyy");
    }

    return dates.to ? `${format(dates.from, "dd MMM")} to ${format(dates.to, "dd MMM")}` : `${format(dates.from, "dd MMM")} to ...`;
  };

  const handleSearch = () => {
    if (!departure || !arrival || departure.code === arrival.code || !dates.from || (tripType === "roundtrip" && !dates.to)) {
      setSearchResult(null);
      return;
    }

    setSearchResult({
      route: `${departure.city} to ${arrival.city}`,
      dates: dateValue(),
      passengers: totalTravelers,
      tripType,
    });
  };

  const airportPicker = (
    value: Airport | null,
    placeholder: string,
    inputValue: string,
    onInputChange: (value: string) => void,
    options: Airport[],
    onSelect: (airport: Airport) => void,
    isOpen: boolean,
    setOpen: (value: boolean) => void,
    ref: RefObject<HTMLDivElement | null>,
  ) => (
    <div className="relative min-w-0 flex-1" ref={ref}>
      <button
        type="button"
        className="group flex h-20 w-full items-center justify-between rounded-2xl border border-[#d9d1c2] bg-[#fbfaf7] px-4 text-left transition hover:border-[#111313] hover:bg-white"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e8f0f0] text-[#146c6c]">
            <MapPin size={19} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-black uppercase text-[#777068]">{placeholder}</span>
            <span className="block truncate text-lg font-black text-[#111313]">{value ? `${value.city} (${value.code})` : "Select airport"}</span>
            <span className="block truncate text-xs font-semibold text-[#777068]">{value?.name ?? "Search city, airport, or code"}</span>
          </span>
        </span>
        <ChevronDown className="shrink-0 text-[#777068] transition group-hover:text-[#111313]" size={19} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-40 overflow-hidden rounded-2xl border border-[#d9d1c2] bg-white shadow-2xl shadow-black/15">
          <div className="flex items-center gap-2 border-b border-[#eee7dd] px-4 py-3">
            <Search size={17} className="text-[#777068]" />
            <input
              type="text"
              placeholder="Search airport"
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#9d968d]"
              value={inputValue}
              onChange={(event) => onInputChange(event.target.value)}
              autoFocus
            />
          </div>
          <ul className="max-h-72 overflow-y-auto p-2">
            {options.slice(0, 18).map((airport) => (
              <li key={airport.code}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-[#f4f0e8]"
                  onClick={() => {
                    onSelect(airport);
                    setOpen(false);
                    onInputChange("");
                  }}
                >
                  <span>
                    <span className="block text-sm font-black text-[#111313]">{airport.city}</span>
                    <span className="block text-xs font-semibold text-[#777068]">{airport.name}</span>
                  </span>
                  <span className="rounded-full bg-[#111313] px-3 py-1 text-xs font-black text-white">{airport.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 text-[#111313] md:p-6">
      <div className="flex flex-col gap-4 border-b border-[#e8dfd2] pb-5 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex w-fit rounded-full bg-[#eee8dc] p-1 text-sm font-black">
          {(["oneway", "roundtrip"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`rounded-full px-5 py-2 transition ${
                tripType === type ? "bg-[#111313] text-white shadow-lg shadow-black/15" : "text-[#58524c] hover:text-[#111313]"
              }`}
              onClick={() => {
                setTripType(type);
                if (type === "oneway") setDates({ from: dates.from, to: null });
              }}
            >
              {type === "oneway" ? "One way" : "Round trip"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-black text-[#58524c]">
          <span className="rounded-full bg-[#e8f0f0] px-3 py-2">Price alerts</span>
          <span className="rounded-full bg-[#f8edc6] px-3 py-2">Flexible fares</span>
          <span className="rounded-full bg-[#ece5f2] px-3 py-2">Instant itinerary</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr_220px_210px_auto] lg:items-start">
        {airportPicker(
          departure,
          "From",
          departureSearch,
          setDepartureSearch,
          filteredDeparture,
          setDeparture,
          showDepartureDropdown,
          setShowDepartureDropdown,
          departureRef,
        )}

        <button
          type="button"
          className="grid size-12 place-items-center self-center rounded-full border border-[#d9d1c2] bg-white text-[#111313] shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#111313] hover:text-white lg:mt-4"
          onClick={swapCities}
          aria-label="Swap departure and arrival"
          title="Swap cities"
        >
          <ArrowRightLeft size={19} />
        </button>

        {airportPicker(
          arrival,
          "To",
          arrivalSearch,
          setArrivalSearch,
          filteredArrival,
          setArrival,
          showArrivalDropdown,
          setShowArrivalDropdown,
          arrivalRef,
        )}

        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            className="flex h-20 w-full items-center gap-3 rounded-2xl border border-[#d9d1c2] bg-[#fbfaf7] px-4 text-left transition hover:border-[#111313] hover:bg-white"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f8edc6] text-[#8a6100]">
              <CalendarDays size={19} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-black uppercase text-[#777068]">When</span>
              <span className="block truncate text-lg font-black">{dateValue()}</span>
              <span className="block text-xs font-semibold text-[#777068]">Tap a date to select</span>
            </span>
          </button>

          {showCalendar && (
            <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-[min(21rem,calc(100vw-2.5rem))] rounded-2xl border border-[#d9d1c2] bg-white p-4 shadow-2xl shadow-black/15">
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full hover:bg-[#f4f0e8]"
                  onClick={() => setCalendarMonth(addMonths(calendarMonth, -1))}
                  aria-label="Previous month"
                  title="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-black">{format(calendarMonth, "MMMM yyyy")}</span>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full hover:bg-[#f4f0e8]"
                  onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                  aria-label="Next month"
                  title="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-black text-[#777068]">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: calendarOffset }).map((_, index) => (
                  <div key={`blank-${index}`} />
                ))}
                {daysInMonth.map((day) => {
                  const selected = Boolean(isSameDay(day, dates.from!) || (dates.to && isSameDay(day, dates.to)));
                  const inRange = isInRange(day);
                  return (
                    <button
                      type="button"
                      key={day.toString()}
                      className={`aspect-square rounded-full text-sm font-black transition ${
                        selected
                          ? "bg-[#111313] text-white shadow-md shadow-black/20"
                          : inRange
                            ? "bg-[#e8f0f0] text-[#146c6c]"
                            : "text-[#111313] hover:bg-[#f4f0e8]"
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={travelersRef}>
          <button
            type="button"
            className="flex h-20 w-full items-center gap-3 rounded-2xl border border-[#d9d1c2] bg-[#fbfaf7] px-4 text-left transition hover:border-[#111313] hover:bg-white"
            onClick={() => setShowTravelers(!showTravelers)}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ece5f2] text-[#5b3779]">
              <UsersRound size={19} />
            </span>
            <span>
              <span className="block text-xs font-black uppercase text-[#777068]">Travelers</span>
              <span className="block text-lg font-black">{travelerLabel(totalTravelers)}</span>
              <span className="block text-xs font-semibold text-[#777068]">Adults, kids, infants</span>
            </span>
          </button>

          {showTravelers && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-72 rounded-2xl border border-[#d9d1c2] bg-white p-4 shadow-2xl shadow-black/15">
              {[
                { label: "Adults", value: adults, min: 1, setValue: setAdults },
                { label: "Children", value: children, min: 0, setValue: setChildren },
                { label: "Infants", value: infants, min: 0, setValue: setInfants },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-[#eee7dd] py-3 last:border-b-0">
                  <div>
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className="block text-xs font-semibold text-[#777068]">
                      {item.label === "Adults" ? "Age 12+" : item.label === "Children" ? "Age 2-11" : "Under 2"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-[#777068] transition hover:text-[#111313] disabled:cursor-not-allowed disabled:opacity-35"
                      onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                      disabled={item.value <= item.min}
                      aria-label={`Decrease ${item.label}`}
                      title={`Decrease ${item.label}`}
                    >
                      <CircleMinus size={24} />
                    </button>
                    <span className="w-5 text-center text-sm font-black">{item.value}</span>
                    <button
                      type="button"
                      className="text-[#111313] transition hover:text-[#146c6c]"
                      onClick={() => item.setValue(item.value + 1)}
                      aria-label={`Increase ${item.label}`}
                      title={`Increase ${item.label}`}
                    >
                      <CirclePlus size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex h-20 items-center justify-center gap-3 rounded-2xl bg-[#111313] px-7 text-base font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#146c6c]"
          onClick={handleSearch}
        >
          <Search size={20} />
          Search
        </button>
      </div>

      <div className="mt-5 rounded-3xl bg-[#111313] p-4 text-white md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black text-[#f7c948]">
              <Sparkles size={16} />
              {searchResult ? "Smart matches ready" : "Tonight's smoothest sample fares"}
            </p>
            <h2 className="mt-1 text-2xl font-black">{searchResult ? searchResult.route : "Delhi to Bengaluru"}</h2>
            <p className="text-sm font-semibold text-white/62">
              {searchResult
                ? `${searchResult.dates} - ${travelerLabel(searchResult.passengers)} - ${searchResult.tripType === "roundtrip" ? "Round trip" : "One way"}`
                : "Round trip - 1 traveler - flexible dates"}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {dealCards.map((deal) => (
              <div key={deal.label} className="min-w-40 rounded-2xl border border-white/12 bg-white/8 p-4">
                <span className="text-xs font-black text-[#f7c948]">{deal.label}</span>
                <p className="mt-1 text-sm font-bold text-white/72">
                  {deal.airline} - {deal.time}
                </p>
                <p className="mt-2 text-2xl font-black">{deal.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
