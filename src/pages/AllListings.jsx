import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../redux/slice/propertySlice";
import PgCard from "../components/PgCard";
import FilterBar from "../components/FilterBar";
import { Building2, SearchX } from "lucide-react";

const AllListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { properties, total, loading, error } = useSelector(
    (state) => state.properties
  );

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 40000,
    amenities: searchParams.get("amenities") || "",
    sort: searchParams.get("sort") || "",
  });

  // Sync initial URL search params
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const searchParam = searchParams.get("search");
    if (cityParam || searchParam) {
      setFilters((prev) => ({
        ...prev,
        city: cityParam || prev.city,
        search: searchParam || prev.search,
      }));
    }
  }, [searchParams]);

  // Fetch properties from backend whenever filters change
  useEffect(() => {
    window.scrollTo(0, 0);

    const queryParams = {};
    if (filters.search) queryParams.search = filters.search;
    if (filters.city && filters.city !== "All") queryParams.city = filters.city;
    if (filters.type && filters.type !== "All") queryParams.type = filters.type;
    if (filters.maxPrice && filters.maxPrice < 40000) queryParams.maxPrice = filters.maxPrice;
    if (filters.amenities) queryParams.amenities = filters.amenities;
    if (filters.sort) queryParams.sort = filters.sort;

    dispatch(fetchProperties(queryParams));
  }, [filters, dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      city: "",
      type: "",
      maxPrice: 40000,
      amenities: "",
      sort: "",
    });
    setSearchParams({});
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header Title & Intro */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-[#364a82] font-semibold mb-1">
            <Building2 className="w-4 h-4" />
            <span>Discover Verified Accommodations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            All PG & Co-Living Listings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Find modern, fully-furnished PGs with zero brokerage and verified amenities.
          </p>
        </div>

        {/* Interactive Filter & Search Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={total || properties.length}
        />

        {/* Property Grid or Loading / Empty States */}
        {loading ? (
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse space-y-4"
              >
                <div className="h-44 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No Accommodations Found
            </h3>
            <p className="text-sm text-gray-500">
              We couldn't find any stays matching your selected filters. Try
              adjusting your price range or clearing filters.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#364a82] hover:bg-[#202e54] text-white text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {properties.map((pg) => (
              <PgCard key={pg._id || pg.id} {...pg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;
