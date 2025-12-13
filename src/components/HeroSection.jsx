import { MapPinIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  //  Run on every change in input
  useEffect(() => {
    if (inputValue.trim() === "") {
      onSearch(""); // reset search if input is empty
    }
  }, [inputValue]);

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const roomOptions = [
    "Near Metro",
    "Female Only",
    "Male Only",
    "AC Rooms",
    "Wifi",
    "Included Food",
    "Non AC",
    "Laundry",
    "Power Backup",
    "Kitchen",
  ];

  return (
    <div className="relative bg-[#132350] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-90"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Your Perfect Furnished "PG" Stay Awaits
        </h1>
        <p className="mt-6 text-md text-center max-w-xl mx-auto">
          Discover comfortable and affordable fully furnished PGs and modern
          apartments that blend luxury, convenience, and affordability.
        </p>

        <div className="mt-10 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row">
            <div className="grow mb-4 md:mb-0 md:mr-4">
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-gray-50">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="ml-2 grow focus:outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>
            <button
              className="bg-[#364a82] hover:bg-[#2b3b67] rounded-xl px-6 py-2 transition flex items-center justify-center cursor-pointer border-none outline-none"
              onClick={handleSearchClick}
            >
              <SearchIcon className="h-5 w-5  mr-2" />
              <span>Search</span>
            </button>
          </div>

          {/* Room Filter Options */}
          <div className="flex flex-row items-center justify-center">
            <span className="bg-white text-gray-800 text-[16px] font-semibold underline underline-offset-2 px-3 py-2 w-60">
              Amenities Like:
            </span>
            <div className="flex flex-wrap gap-3 mt-4">
              {roomOptions.map((items, index) => (
                <h1
                  key={index}
                  className="bg-gray-200 text-gray-800  text-sm px-3 py-2 rounded-full transition"
                >
                  {items}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
