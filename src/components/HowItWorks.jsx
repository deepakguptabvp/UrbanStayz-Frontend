import { Search, CalendarCheck, KeyRound, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const steps = [
  {
    number: "01",
    title: "Discover Your Stay",
    description:
      "Explore verified PGs and co-living spaces with smart filters for budget, location, AC, food, and gender preferences.",
    icon: Search,
    color: "from-blue-600 to-indigo-600",
    badge: "Smart Discovery",
    benefits: ["Zero brokerage", "Verified photos & amenities", "Real map locations"],
  },
  {
    number: "02",
    title: "Schedule a Free Visit",
    description:
      "Book an instant physical site visit or virtual tour at your preferred date & time with direct host coordination.",
    icon: CalendarCheck,
    color: "from-amber-500 to-orange-500",
    badge: "Free & Flexible",
    benefits: ["No booking charges", "Select custom time slots", "Dedicated visit support"],
  },
  {
    number: "03",
    title: "Move In Seamlessly",
    description:
      "Finalize transparent terms directly with verified owners, pay safe deposits, and unpack into your fully managed room.",
    icon: KeyRound,
    color: "from-emerald-500 to-teal-600",
    badge: "Instant Settle-In",
    benefits: ["Standard rental agreement", "Transparent deposit terms", "24/7 assistance"],
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-900" /> Hassle-Free Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            How <span className="text-[#132350]">UrbanStayz</span> Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Finding your next comfortable, affordable home is as simple as 1, 2, 3.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                {/* Step Top Row */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-gray-200 group-hover:text-blue-900/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Badge & Title */}
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2">
                    {step.badge}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Key Checklist Benefits */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {step.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 bg-[#132350] hover:bg-[#202e54] text-white px-8 py-3.5 rounded-xl font-semibold transition hover:shadow-lg cursor-pointer text-sm sm:text-base"
          >
            <span>Start Exploring Stays</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
