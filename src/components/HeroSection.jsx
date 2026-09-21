import { MapPinIcon, SearchIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HeroSection = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Run on every change in input
  useEffect(() => {
    if (inputValue.trim() === "" && onSearch) {
      onSearch(""); // reset search if input is empty
    }
  }, [inputValue, onSearch]);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    } else if (inputValue.trim()) {
      navigate(`/alllistings?search=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleAmenityPillClick = (amenity) => {
    navigate(`/alllistings?amenities=${encodeURIComponent(amenity)}`);
  };

  const roomOptions = [
    "Near Metro",
    "Near IT Park",
    "Prime Location",
    "Female Only",
    "Male Only",
    "Co-living",
    "AC Rooms",
    "Attached Bathroom",
    "Wifi",
    "Gym",
    "Fully Furnished",
    "Included Food",
    "Power Backup",
    "Laundry",
    "Parking",
  ];

  return (
    <div className="relative bg-[#132350] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-90"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-20 lg:py-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> India's Trusted PG & Co-Living Network
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Find Your Ideal <span className="text-amber-400">Fully Furnished</span> PG
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover curated, verified, and cost-effective PG residences across
            Bangalore, Pune, Delhi, Hyderabad, and Mumbai with zero brokerage.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto bg-white/15 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row">
            <div className="grow">
              <div className="flex items-center border border-gray-200/80 rounded-xl px-3.5 py-3 bg-white shadow-inner">
                <MapPinIcon className="h-5 w-5 text-rose-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter city or area (e.g., Koramangala, Bangalore)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                  className="ml-2 grow focus:outline-none bg-transparent text-gray-800 text-sm sm:text-base font-medium placeholder:text-gray-400"
                />
              </div>
            </div>
            <button
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold rounded-xl px-6 sm:px-8 py-3 sm:ml-3 transition flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl text-sm sm:text-base"
              onClick={handleSearchClick}
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              <span>Search Stays</span>
            </button>
          </div>

          {/* Quick Filter Options */}
          <div className="mt-5">
            <h2 className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-2.5">
              Popular Filters & Amenities:
            </h2>
            <div className="flex flex-wrap gap-2">
              {roomOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAmenityPillClick(item)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full transition border border-white/15 cursor-pointer backdrop-blur-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
