import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyById } from "../redux/slice/propertySlice";
import ScheduleVisitModal from "../components/ScheduleVisitModal";
import PgCard from "../components/PgCard";
import {
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  Bed,
  Utensils,
  Train,
  Building2,
  Users,
  Home,
  Snowflake,
  WifiHighIcon,
  WashingMachine,
  Sparkles,
  ParkingCircle,
  Camera,
  Dumbbell,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const amenityIcons = {
  "Near Metro": Train,
  "Near IT Park": Building2,
  "Prime Location": MapPin,
  "Public Transport Nearby": Train,
  "Female Only": Users,
  "Male Only": Users,
  "Co-living": Users,
  "Family Friendly": Home,
  "AC Rooms": Snowflake,
  "Non AC": Snowflake,
  "Attached Bathroom": Home,
  "Private Room": Bed,
  "Fully Furnished": Bed,
  "Semi Furnished": Bed,
  Wifi: WifiHighIcon,
  "Included Food": Utensils,
  "Common Kitchen": Utensils,
  Laundry: WashingMachine,
  Housekeeping: Sparkles,
  "Power Backup": Sparkles,
  Parking: ParkingCircle,
  "CCTV Surveillance": Camera,
  Gym: Dumbbell,
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProperty: property, similarProperties, loading, error } =
    useSelector((state) => state.properties);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(fetchPropertyById(id));
      setActiveImageIndex(0);
    }
  }, [id, dispatch]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.name || property?.title,
        text: `Check out this stay on UrbanStayz: ${property?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    toast.success(
      !isSaved ? "Saved to your bookmarks!" : "Removed from bookmarks"
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">
          Loading property details from UrbanStayz...
        </p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
        <p className="text-gray-600">
          The property you are looking for might have been moved or is currently
          unavailable.
        </p>
        <button
          onClick={() => navigate("/alllistings")}
          className="inline-flex items-center gap-2 bg-[#364a82] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#202e54] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Listings</span>
        </button>
      </div>
    );
  }

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images
      : [property.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=70"];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveToggle}
              className={`p-2 rounded-lg border border-gray-200 transition cursor-pointer ${
                isSaved
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 ${isSaved ? "fill-rose-600 text-rose-600" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-6">
        {/* Main Grid: Gallery & Details + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left / Center 2 Columns: Media & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 overflow-hidden">
              {/* Active Hero Image */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={galleryImages[activeImageIndex] || galleryImages[0]}
                  alt={property.name || property.title}
                  className="w-full h-full object-cover transition duration-300"
                />
                {/* Type Badge */}
                <div className="absolute top-3 left-3 bg-[#132350] text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                  {property.type || property.genderPreference || "Co-living"}
                </div>
                {/* Verified Badge */}
                {property.isVerified && (
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Stay</span>
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-blue-900 ring-2 ring-blue-900/20"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Core Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {property.name || property.title}
                  </h1>
                  <div className="flex items-center gap-1 text-gray-600 mt-1 text-sm">
                    <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex-shrink-0">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-900 text-sm">
                    {property.rating || property.ratings || 4.5}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({property.numReviews || 18} reviews)
                  </span>
                </div>
              </div>

              {/* Key Features Quick Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 text-center">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="block text-xs text-gray-500 font-medium">
                    Property Type
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {property.propertyType || "PG / Co-living"}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="block text-xs text-gray-500 font-medium">
                    Furnishing
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {property.furnishing || "Fully Furnished"}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="block text-xs text-gray-500 font-medium">
                    Food Included
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {property.includedFood ? "Yes (3 Meals)" : "Optional / Self"}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="block text-xs text-gray-500 font-medium">
                    Metro Nearby
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {property.nearMetro ? "Within 500m" : "Bus / Auto"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                About this Accommodation
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {property.description ||
                  "Enjoy modern, hassle-free living designed for students and working professionals. Comes with high-speed internet, regular sanitization, air conditioning, and top security standards."}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {property.amenities?.map((amenity, idx) => {
                  const Icon = amenityIcons[amenity] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl text-xs sm:text-sm font-medium text-gray-700 border border-gray-100"
                    >
                      <Icon className="w-4 h-4 text-blue-900 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property Host Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {property.owner?.name ? property.owner.name.charAt(0) : "H"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {property.owner?.name || "UrbanStayz Verified Host"}
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Fast Responder • Verified Host
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${property.owner?.phone || "+919876543210"}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Host</span>
                </a>
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-[#364a82] text-white rounded-xl text-sm font-semibold hover:bg-[#202e54] transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
              {/* Pricing Header */}
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Monthly Rent Starts At
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#132350]">
                    ₹{property.price?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">/ month</span>
                </div>
              </div>

              {/* Price Details Breakdown */}
              <div className="space-y-2.5 text-sm py-4 border-y border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Monthly Maintenance</span>
                  <span className="font-semibold text-emerald-600">Included (₹0)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Security Deposit</span>
                  <span className="font-semibold text-gray-800">
                    ₹{(property.securityDeposit || property.price)?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Electricity & Wifi</span>
                  <span className="font-semibold text-gray-800">Included</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Notice Period</span>
                  <span className="font-semibold text-gray-800">30 Days</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full bg-[#132350] hover:bg-[#202e54] text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Schedule Free Visit</span>
                </button>

                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Book This Stay</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 text-center text-xs text-gray-500 space-y-1">
                <p className="flex items-center justify-center gap-1 font-medium text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  100% Verified Property & Zero Brokerage
                </p>
                <p>Instant confirmation • No booking fee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties && similarProperties.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Stays Nearby
            </h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((pg) => (
                <PgCard key={pg._id || pg.id} {...pg} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        property={property}
      />
    </div>
  );
};

export default PropertyDetails;
