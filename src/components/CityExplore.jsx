import { MapPin, ArrowRight, Building } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const cities = [
  {
    name: "Bangalore",
    tag: "Silicon Valley of India",
    count: "6+ Stays",
    startingPrice: "₹8,900",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=75",
    areas: "Koramangala, HSR, Whitefield, Indiranagar",
  },
  {
    name: "Pune",
    tag: "Oxford of the East",
    count: "3+ Stays",
    startingPrice: "₹14,000",
    image:
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=600&q=75",
    areas: "Viman Nagar, Baner, Hadapsar, Hinjewadi",
  },
  {
    name: "Delhi",
    tag: "National Capital Region",
    count: "3+ Stays",
    startingPrice: "₹6,500",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=75",
    areas: "Mayur Vihar, Laxmi Nagar, Saket, North Campus",
  },
  {
    name: "Mumbai",
    tag: "Financial Capital",
    count: "1+ Stays",
    startingPrice: "₹15,500",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=75",
    areas: "Powai, Andheri, Vile Parle",
  },
  {
    name: "Hyderabad",
    tag: "Cyberabad Tech City",
    count: "1+ Stays",
    startingPrice: "₹11,000",
    image:
      "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=600&q=75",
    areas: "Gachibowli, Hitec City, Madhapur",
  },
  {
    name: "Noida",
    tag: "NCR Tech Corridor",
    count: "1+ Stays",
    startingPrice: "₹9,000",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=75",
    areas: "Sector 62, Sector 18, Electronic City",
  },
];

const CityExplore = () => {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate(`/alllistings?city=${encodeURIComponent(cityName)}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" /> Prime Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Explore Stays in Top Cities
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Find PGs and co-living apartments near IT parks, universities, and metro stations.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-950 transition cursor-pointer"
          >
            <span>View All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => handleCityClick(city.name)}
              className="relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image background */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  {city.count}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-bold flex items-center gap-1.5 group-hover:text-amber-300 transition">
                    <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    {city.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-300">
                    Starts {city.startingPrice}/mo
                  </span>
                </div>

                <p className="text-xs text-gray-300 line-clamp-1">
                  {city.areas}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white transition">
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityExplore;
