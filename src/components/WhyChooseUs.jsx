import { ShieldCheck, Banknote, Wifi, Headphones, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Banknote,
    title: "Zero Brokerage Guaranteed",
    description:
      "Save thousands on broker commissions. Deal directly with property owners and verified stay managers with 100% price transparency.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified Accommodations",
    description:
      "Every single room is physically inspected for security, hygiene, water supply, power backup, and photographic accuracy.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Wifi,
    title: "All-Inclusive Modern Living",
    description:
      "High-speed fiber WiFi, daily housekeeping, 3 nutritious meals, laundry facilities, and AC all bundled into one straightforward monthly rent.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description:
      "Our prompt on-ground team is always available to assist with maintenance requests, room changes, or contract extensions.",
    color: "from-purple-600 to-pink-600",
  },
];

const stats = [
  { value: "15+", label: "Prime Tech Hubs" },
  { value: "1,200+", label: "Happy Residents" },
  { value: "100%", label: "Verified Listings" },
  { value: "4.8 ★", label: "Average Rating" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-950 text-xs font-bold uppercase tracking-wider border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> The UrbanStayz Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why Modern Renters Choose Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            We reimagined PG and co-living accommodation from the ground up so you can focus on your career and studies.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Strip */}
        <div className="mt-12 sm:mt-16 bg-[#132350] rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className={idx > 0 ? "pt-4 md:pt-0" : ""}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
