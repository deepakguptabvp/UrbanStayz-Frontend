import { Quote } from "lucide-react";
import testimonials from "../data/testimonialData";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Manual navigation slide buttons
  const goToNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Testimonials from Our Esteemed Users
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Join the multitude who have seamlessly secured premium PG
            accommodations through our distinguished platform.
          </p>
        </div>
        <div className="mt-12 relative flex items-center justify-center ">
          <div className="overflow-hidden w-full mx-8 ">
            <div
              className="flex transition-transform duration-500 ease-in-out "
              style={{
                width: `${testimonials.length * 100}%`,
                transform: `translateX(-${
                  currentSlide * (100 / testimonials.length)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex w-full p-4 justify-center"
                >
                  <div className="bg-white rounded-lg shadow-md p-4 relative w-full max-w-3xl">
                    <Quote className="h-8 w-8 text-indigo-200 absolute top-3 left-6 opacity-50" />
                    <p className="text-gray-600 relative pl-4 italic">
                      “{testimonial.content}”
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold text-gray-900 underline">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Navigating */}
          <button
            className="absolute left-0 lg:left-10 xl:left-40 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-all duration-300 cursor-pointer"
            onClick={goToPrevSlide}
            aria-label="Previous slider button"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Right Navigation */}
          <button
            className="absolute right-0 lg:right-10 xl:right-40 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-all duration-300 cursor-pointer"
            onClick={goToNextSlide}
            aria-label="Next slider button"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Navigating Indicator buttons */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full inline-block ${
                index === currentSlide ? "bg-indigo-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
