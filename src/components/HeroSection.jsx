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
    "Near IT Park",
    "Prime Location",
    "Public Transport Nearby",
    "Female Only",
    "Male Only",
    "Co-living",
    "Family Friendly",
    "AC Rooms",
    "Non AC",
    "Attached Bathroom",
    "Private Room",
    "Wifi",
    "Gym",
    "Fully Furnished",
    "Semi Furnished",
    "Power Backup",
    "Included Food",
    "Common Kitchen",
    "Laundry",
    "Housekeeping",
    "CCTV Surveillance",
    "Parking",
  ];

  return (
    <div className="relative bg-[#132350] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-90"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-20 lg:py-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
          Your Perfect Furnished "PG" Stay Awaits
        </h1>
        <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base text-center max-w-2xl mx-auto">
          Discover comfortable and affordable fully furnished PGs and modern
          apartments that blend luxury, convenience, and affordability.
        </p>

        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto bg-white rounded-lg shadow-md p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row">
            <div className="grow">
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 sm:py-3 bg-gray-50">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter search city"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="ml-2 grow focus:outline-none bg-transparent text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>
            <button
              className="bg-[#364a82] hover:bg-[#2b3b67] rounded-xl px-4 sm:px-6 py-2 sm:ml-4 transition flex items-center justify-center cursor-pointer border-none outline-none text-sm sm:text-base"
              onClick={handleSearchClick}
            >
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>Search</span>
            </button>
          </div>

          {/* Room Filter Options */}
          <div className="my-4 lg:my-6">
            <h2 className="bg-white text-gray-800 text-sm sm:text-base font-semibold underline underline-offset-2 mb-3">
              Amenities Like:
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {roomOptions.slice(0, 16).map((items, index) => (
                <h1
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition hover:bg-gray-300"
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
