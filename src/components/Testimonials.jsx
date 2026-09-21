import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, Heart } from "lucide-react";
import testimonials from "../data/testimonialData";
import { motion, AnimatePresence } from "framer-motion";

const enrichedTestimonials = [
  {
    ...testimonials[0],
    city: "Koramangala, Bangalore",
    stayDuration: "Stayed 8 months",
    rating: 5,
  },
  {
    ...testimonials[1],
    city: "North Campus, Delhi",
    stayDuration: "Stayed 1 year",
    rating: 5,
  },
  {
    ...testimonials[2],
    city: "Indiranagar, Bangalore",
    stayDuration: "Stayed 6 months",
    rating: 5,
  },
  {
    ...testimonials[3],
    city: "Viman Nagar, Pune",
    stayDuration: "Stayed 1.5 years",
    rating: 5,
  },
  {
    ...testimonials[4],
    city: "Gachibowli, Hyderabad",
    stayDuration: "Stayed 10 months",
    rating: 5,
  },
  {
    ...testimonials[5],
    city: "Powai, Mumbai",
    stayDuration: "Stayed 4 months",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % enrichedTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % enrichedTestimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + enrichedTestimonials.length) % enrichedTestimonials.length
    );
  };

  const current = enrichedTestimonials[currentIndex];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Real Stories, Real Homes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Loved by 1,200+ Happy Tenants
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Hear from students and working professionals who found their dream stay on UrbanStayz.
          </p>
        </div>

        {/* Featured Testimonial Hero Card */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 relative"
            >
              {/* Top Quote Icon & Stars */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-gray-700">
                    5.0 Verified Review
                  </span>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Resident
                </span>
              </div>

              {/* Testimonial Quote */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic relative">
                <Quote className="w-10 h-10 text-blue-100 absolute -top-4 -left-3 -z-10" />
                “{current.content}”
              </p>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                  />
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {current.author}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {current.role} • <span className="text-blue-900 font-semibold">{current.city}</span>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-gray-400 font-medium">
                  <span>{current.stayDuration}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 max-w-sm mx-auto">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm hover:shadow transition cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2">
              {enrichedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-[#132350]"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm hover:shadow transition cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
