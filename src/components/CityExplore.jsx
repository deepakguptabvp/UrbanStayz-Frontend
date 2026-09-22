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
      "https://makeithappen.co.in/wp-content/uploads/2026/06/historical-places-in-banglore.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Charminar_of_Hyderabad_Telangana.jpg",
    areas: "Gachibowli, Hitec City, Madhapur",
  },
  {
    name: "Noida",
    tag: "NCR Tech Corridor",
    count: "1+ Stays",
    startingPrice: "₹9,000",
    image:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/metro_or_night_view.webp",
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" /> Prime Locations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Explore Stays in Top Cities
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Find PGs and co-living apartments near IT parks, universities, and metro stations.
          </p>
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

        {/* View All Button */}
        <div className="mt-10 sm:mt-12 flex justify-center text-center">
          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 bg-[#132350] hover:bg-[#202e54] text-white py-3.5 px-8 text-base font-semibold rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span>View All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CityExplore;
