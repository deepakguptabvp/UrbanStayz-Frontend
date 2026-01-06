import { useNavigate } from "react-router";
import PgCard from "./PgCard";

const FeaturedListing = ({ listings = [] }) => {
  const navigate = useNavigate();

  const featuredListings = listings.slice(0, 12);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Featured PG Accommodations
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Discover our hand-picked selection of the best PG accommodations
            available right now.
          </p>
        </div>
        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {featuredListings.length === 0 ? (
            <p>No Acoomodation found for this location.</p>
          ) : (
            featuredListings.map((pg) => <PgCard key={pg.id} {...pg} />)
          )}
        </div>
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="bg-[#364a82] hover:bg-[#16317b] text-white py-2 px-6 sm:px-8 text-sm sm:text-base rounded-md transition hover:shadow-lg cursor-pointer"
          >
            View All Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListing;
