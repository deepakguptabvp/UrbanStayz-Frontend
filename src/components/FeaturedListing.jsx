import { useNavigate } from "react-router";
import PgCard from "./PgCard";

const FeaturedListing = ({ listings = [], loading = false }) => {
  const navigate = useNavigate();
  const featuredListings = listings.slice(0, 9);

  return (
    <section id="featured-listings" className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
            Handpicked Stays
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
            Featured PG Accommodations
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Discover our curated selection of verified, top-rated PG accommodations
            across major metropolitan hubs.
          </p>
        </div>

        {loading ? (
          <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse space-y-4"
              >
                <div className="h-44 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {featuredListings.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>No accommodations found matching your search.</p>
              </div>
            ) : (
              featuredListings.map((pg) => (
                <PgCard key={pg._id || pg.id} {...pg} />
              ))
            )}
          </div>
        )}

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="bg-[#132350] hover:bg-[#202e54] text-white py-3 px-8 text-sm sm:text-base font-semibold rounded-xl transition hover:shadow-lg cursor-pointer"
          >
            Explore All 15+ Listings →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListing;
