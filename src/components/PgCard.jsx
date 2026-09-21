import {
  MapPinIcon,
  StarIcon,
  MapPin,
  Building2,
  Navigation,
  Users,
  Home,
  Snowflake,
  Fan,
  ShowerHead,
  KeyRound,
  BedDouble,
  BedSingle,
  WifiHighIcon,
  Soup,
  Utensils,
  WashingMachine,
  Sparkles,
  Plug,
  ParkingCircle,
  Camera,
  Dumbbell,
  User,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const PgCard = ({
  _id,
  id,
  name,
  title,
  location,
  price,
  rating,
  ratings,
  imageUrl,
  type,
  genderPreference,
  amenities,
  isVerified = true,
}) => {
  const navigate = useNavigate();
  const propertyId = _id || id;
  const displayName = name || title || "UrbanStayz PG";
  const displayRating = rating || ratings || 4.5;
  const displayType = type || genderPreference || "Co-living";

  const amenityIcons = {
    "Near Metro": MapPin,
    "Near IT Park": Building2,
    "Prime Location": Navigation,
    "Public Transport Nearby": Navigation,
    "Female Only": User,
    "Male Only": User,
    "Co-living": Users,
    "Family Friendly": Home,
    "AC Rooms": Snowflake,
    "Non AC": Fan,
    "Attached Bathroom": ShowerHead,
    "Private Room": KeyRound,
    "Fully Furnished": BedDouble,
    "Semi Furnished": BedSingle,
    Wifi: WifiHighIcon,
    "Included Food": Soup,
    "Common Kitchen": Utensils,
    Laundry: WashingMachine,
    Housekeeping: Sparkles,
    "Power Backup": Plug,
    Parking: ParkingCircle,
    "CCTV Surveillance": Camera,
    Gym: Dumbbell,
  };

  const handleCardClick = () => {
    if (propertyId) {
      navigate(`/property/${propertyId}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 shrink-0 overflow-hidden bg-gray-100">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=70"
          }
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-[#132350]/90 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm">
          {displayType}
        </div>

        {/* Verified tag */}
        {isVerified && (
          <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-0.5 text-[11px] font-medium rounded-full flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Name & Rating */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-900 transition">
            {displayName}
          </h3>
          <div className="flex items-center bg-emerald-50 px-2 py-0.5 rounded-lg flex-shrink-0 border border-emerald-100">
            <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-xs font-bold text-gray-800">
              {displayRating}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex mt-1.5 items-center text-gray-500">
          <MapPinIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-rose-500" />
          <span className="text-xs sm:text-sm line-clamp-1">{location}</span>
        </div>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {amenities?.slice(0, 4).map((amenity, index) => {
            const Icon = amenityIcons[amenity];
            return (
              <span
                key={index}
                className="bg-gray-50 text-gray-600 text-[11px] font-medium py-1 px-2 rounded-lg flex items-center gap-1 border border-gray-100"
              >
                {Icon && <Icon className="h-3 w-3 text-blue-900" />}
                {amenity}
              </span>
            );
          })}
          {amenities && amenities.length > 4 && (
            <span className="text-[11px] text-gray-400 py-1 px-1 font-medium">
              +{amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-4 flex justify-between items-center gap-2 border-t border-gray-100">
          <div>
            <span className="text-lg sm:text-xl text-[#132350] font-extrabold">
              ₹{price?.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 font-medium"> / month</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="bg-[#364a82] hover:bg-[#132350] text-white py-1.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PgCard;