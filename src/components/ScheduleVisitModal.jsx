import { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { createBooking } from "../services/propertyApi";

const ScheduleVisitModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    timeSlot: "Morning (10:00 AM - 01:00 PM)",
    occupancyType: "Single Room",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.visitDate) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        propertyId: property._id || property.id,
        ...formData,
      });

      setSubmitted(true);
      toast.success("Visit scheduled successfully! Host will reach out soon.");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to schedule visit. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  // Get tomorrow's date for date picker min
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-[#132350] text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              Free Site Visit
            </span>
            <h2 className="text-xl md:text-2xl font-bold mt-1">
              Schedule a Visit
            </h2>
            <p className="text-sm text-gray-300 mt-1 line-clamp-1">
              {property.name || property.title} • {property.location}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Visit Request Confirmed!
                </h3>
                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  We've notified the property manager of{" "}
                  <strong>{property.name || property.title}</strong>. They will call
                  you on <strong>+91 {formData.phone}</strong> to confirm your arrival.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-2 border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled Date:</span>
                    <span className="font-semibold text-gray-800">
                      {formData.visitDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time Slot:</span>
                    <span className="font-semibold text-gray-800">
                      {formData.timeSlot}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full bg-[#364a82] hover:bg-[#202e54] text-white py-3 rounded-xl font-medium transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setFormData((prev) => ({ ...prev, phone: digits }));
                        }}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Visit Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="visitDate"
                        required
                        min={minDate}
                        value={formData.visitDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm bg-white"
                      >
                        <option value="Morning (10:00 AM - 01:00 PM)">
                          Morning (10 AM - 1 PM)
                        </option>
                        <option value="Afternoon (01:00 PM - 04:00 PM)">
                          Afternoon (1 PM - 4 PM)
                        </option>
                        <option value="Evening (04:00 PM - 07:00 PM)">
                          Evening (4 PM - 7 PM)
                        </option>
                        <option value="Anytime">Anytime</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Room Preference */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Room Preference
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <select
                      name="occupancyType"
                      value={formData.occupancyType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm bg-white"
                    >
                      <option value="Single Room">Private Single Room</option>
                      <option value="Double Sharing">Double Sharing (2 Beds)</option>
                      <option value="Triple Sharing">Triple Sharing (3 Beds)</option>
                      <option value="Any">Any Available</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Special Request (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="E.g., Need parking space, vegetarian food preference..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#132350] hover:bg-[#202e54] text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl mt-2 disabled:opacity-50"
                >
                  {loading ? "Scheduling Visit..." : "Confirm Free Site Visit"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleVisitModal;
