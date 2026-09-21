import { useState } from "react";
import {
  SlidersHorizontal,
  X,
  Search,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const CITIES = ["All", "Bangalore", "Pune", "Delhi", "Mumbai", "Hyderabad", "Noida"];
const STAY_TYPES = ["All", "Female Only", "Male Only", "Co-living"];
const POPULAR_AMENITIES = [
  "Wifi",
  "AC Rooms",
  "Included Food",
  "Gym",
  "Near Metro",
  "Near IT Park",
  "Power Backup",
  "Attached Bathroom",
  "Laundry",
  "Parking",
  "Fully Furnished",
];

const FilterBar = ({ filters, onFilterChange, onReset, totalCount = 0 }) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCityClick = (city) => {
    onFilterChange({ city: city === "All" ? "" : city });
  };

  const handleTypeClick = (type) => {
    onFilterChange({ type: type === "All" ? "" : type });
  };

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities ? filters.amenities.split(",") : [];
    let updated;
    if (current.includes(amenity)) {
      updated = current.filter((a) => a !== amenity);
    } else {
      updated = [...current, amenity];
    }
    onFilterChange({ amenities: updated.join(",") });
  };

  const selectedAmenities = filters.amenities
    ? filters.amenities.split(",")
    : [];

  const activeFiltersCount =
    (filters.city ? 1 : 0) +
    (filters.type ? 1 : 0) +
    (filters.maxPrice && filters.maxPrice < 40000 ? 1 : 0) +
    (selectedAmenities.length > 0 ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
      {/* Search & Top Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pb-4 border-b border-gray-100">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by area, PG name, or landmark..."
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none transition"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: "" })}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 justify-between md:justify-end">
          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline text-xs font-semibold uppercase text-gray-400">
              Sort:
            </span>
            <select
              value={filters.sort || ""}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Recommended</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Filter button for mobile */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-[#364a82] text-white rounded-xl text-sm font-medium transition cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 font-bold text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Quick City Pills */}
      <div className="pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
            Explore Cities
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Showing <strong className="text-blue-950">{totalCount}</strong> stays
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => {
            const isSelected =
              (city === "All" && !filters.city) || filters.city === city;
            return (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-[#132350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Filters for Desktop & Mobile Toggle */}
      <div
        className={`${
          mobileFilterOpen ? "block" : "hidden md:block"
        } pt-4 mt-4 border-t border-gray-100 space-y-4`}
      >
        {/* Gender / Type filter */}
        <div>
          <span className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
            Stay Type
          </span>
          <div className="flex flex-wrap gap-2">
            {STAY_TYPES.map((type) => {
              const isSelected =
                (type === "All" && !filters.type) || filters.type === type;
              return (
                <button
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-900 text-white font-semibold"
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
              Max Monthly Budget
            </span>
            <span className="text-sm font-bold text-blue-900">
              ₹{filters.maxPrice ? Number(filters.maxPrice).toLocaleString() : "40,000"}
              {(!filters.maxPrice || filters.maxPrice >= 40000) && "+"}
            </span>
          </div>
          <input
            type="range"
            min={5000}
            max={40000}
            step={1000}
            value={filters.maxPrice || 40000}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-[#364a82] h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹5,000</span>
            <span>₹20,000</span>
            <span>₹40,000+</span>
          </div>
        </div>

        {/* Amenities Selection */}
        <div>
          <span className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
            Filter by Amenities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_AMENITIES.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Reset */}
        {activeFiltersCount > 0 && (
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {activeFiltersCount} filter(s) active
            </span>
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
