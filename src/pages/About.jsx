import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Users,
  Target,
  Heart,
  CheckCircle2,
  Building2,
  Award,
  ArrowRight,
  Code2,
  Globe2,
} from "lucide-react";
import { useNavigate } from "react-router";

const values = [
  {
    icon: ShieldCheck,
    title: "100% Transparency",
    description:
      "No hidden fees, no broker markups, and no surprises. What you see online matches the exact room and price you get.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Award,
    title: "Verified Quality",
    description:
      "Every accommodation undergoes rigorous inspection covering hygiene, security, power backup, and food quality.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We design spaces that foster friendships and collaborative networks among like-minded students and young professionals.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "Tenant Care",
    description:
      "Dedicated ground support team ready to assist with rapid maintenance turnaround, digital agreements, and easy moves.",
    color: "from-purple-600 to-pink-600",
  },
];

const milestones = [
  {
    year: "15+",
    title: "Metropolitan Tech Hubs",
    desc: "Active listings across Bangalore, Pune, Delhi, Mumbai, Hyderabad & Noida.",
  },
  {
    year: "1,200+",
    title: "Happy Residents",
    desc: "Students and IT professionals who found their home with zero brokerage.",
  },
  {
    year: "100%",
    title: "Direct Host Connections",
    desc: "Zero middlemen. Direct coordination between tenants and verified owners.",
  },
  {
    year: "4.8 ★",
    title: "Average User Rating",
    desc: "Consistently rated 5 stars for accuracy, hygiene, and support responsiveness.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#132350] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-95" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
            <Sparkles className="w-3.5 h-3.5" /> Redefining Urban Co-Living
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
            Making City Living <span className="text-amber-400">Comfortable</span>, Verified & Stress-Free
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            UrbanStayz is India’s dedicated platform connecting students and working professionals with curated, premium PG accommodations and managed rentals.
          </p>
        </div>
      </section>

      {/* 2. Our Mission & Story */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                Our Purpose
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Say Goodbye to Brokerage, Fake Photos & Hidden Charges
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Finding accommodation in a new city used to mean endless phone calls with unreliable brokers, surprise maintenance charges, and rooms that looked nothing like their photos.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              <strong>UrbanStayz was built to fix that.</strong> We bring transparency, verified amenities, high-speed connectivity, and verified hosts together in one seamless platform so you can move into your dream room in minutes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Zero Brokerage Commissions",
                "Physically Verified Rooms",
                "Digital Visit Scheduling",
                "Transparent Refund Policies",
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                alt="Modern Urban Living Room"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  UrbanStayz Standard
                </span>
                <h4 className="text-lg font-bold">
                  Curated Spaces Designed for Modern Lifestyles
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our Core Principles
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Every feature we build is focused on making your living experience seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Platform Impact Numbers */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#132350] rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {milestones.map((m, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6 sm:pt-0" : ""}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400">
                  {m.year}
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {m.title}
                </h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Creator / Engineering Story Card */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#132350] to-[#202e54] text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-md flex-shrink-0">
              DG
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-0.5 rounded-full">
                <Code2 className="w-3.5 h-3.5" /> Built with Precision & Care
              </span>
              <h3 className="text-2xl font-bold text-gray-900">
                Created by Deepak Gupta
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                UrbanStayz is designed to solve real-world rental challenges using a modern, scalable full-stack architecture with React 19, Redux Toolkit, TailwindCSS, Express 5, and MongoDB Atlas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Browse our 15+ verified properties across India's top tech cities and book a free visit today.
          </p>
          <button
            onClick={() => {
              navigate("/alllistings");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 bg-[#132350] hover:bg-[#202e54] text-white font-bold py-3.5 px-8 rounded-xl transition shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span>Explore All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
