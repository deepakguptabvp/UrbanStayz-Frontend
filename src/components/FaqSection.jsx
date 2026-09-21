import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is included in the monthly rent?",
    answer:
      "Most properties listed on UrbanStayz include high-speed WiFi, daily or alternate-day housekeeping, electricity, water supply, and access to common areas (like kitchen, lounge, gym). Food inclusion (3 meals/day) is explicitly mentioned on each property card.",
  },
  {
    question: "How does the Free Site Visit work?",
    answer:
      "Clicking 'Schedule Free Visit' on any property lets you pick a date and time slot. Our team immediately coordinates with the verified property manager, and you receive an instant confirmation via call/SMS with the exact address and contact details.",
  },
  {
    question: "Do I have to pay any brokerage or platform fee?",
    answer:
      "No! UrbanStayz is 100% zero brokerage for tenants. You only pay the rent and security deposit directly to the verified property owner.",
  },
  {
    question: "What is the security deposit policy and notice period?",
    answer:
      "Security deposits are typically 1 to 2 months' rent and are 100% refundable upon moving out, subject to the standard 30-day notice period specified in your digital rental agreement.",
  },
  {
    question: "Are there gender-specific PGs available?",
    answer:
      "Yes! You can use our quick filter to choose 'Female Only', 'Male Only', or 'Co-living' stays. Each property enforces strict security guidelines and biometric/CCTV access.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Everything you need to know about booking, amenities, and living in an UrbanStayz property.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4.5 flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-50/50 transition"
                >
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-blue-900 text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
