import {
  MapPinIcon,
  StarIcon,
  WifiIcon,
  ShowerHeadIcon,
  BedIcon,
  SoupIcon,
  WashingMachineIcon,
  SnowflakeIcon,
  DumbbellIcon,
  PlugIcon,
  TvIcon,
  ParkingCircleIcon,
  ShieldCheckIcon,
  FanIcon,
  ThermometerIcon,
  UtensilsIcon,
  KeyRoundIcon,
  LockIcon,
  Wifi,
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
} from "lucide-react";

import { motion } from "framer-motion";

const PgCard = ({
  name,
  location,
  price,
  rating,
  imageUrl,
  type,
  amenities,
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 md:h-48 shrink-0">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#364a82] text-white px-2 py-1 text-xs rounded">
          {type}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        {/* Name & Rating */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {name}
          </h3>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded flex-shrink-0">
            <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {rating}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex mt-2 items-center text-gray-600">
          <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{location}</span>
        </div>

        {/* Amenities */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {amenities.map((amenity, index) => {
            const Icon = amenityIcons[amenity];
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded-full flex items-center gap-1"
              >
                {Icon && <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                {amenity}
              </motion.span>
            );
          })}
        </div>

        {/* Price & CTA - LOCKED TO BOTTOM */}
        <div className="mt-auto pt-3 sm:pt-4 md:pt-5 flex justify-between items-center gap-2">
          <div>
            <span className="text-lg sm:text-lg text-[#364a82] font-bold">
              ₹{price}
            </span>
            <span className="text-sm sm:text-sm text-gray-500"> /month</span>
          </div>

          <button className="bg-[#364a82] hover:bg-[#d28c14] text-white py-1 sm:py-1.5 px-3 sm:px-4 rounded text-sm sm:text-sm transition cursor-pointer flex-shrink-0">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PgCard;
