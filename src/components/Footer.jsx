import { useState } from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to UrbanStayz stay alerts!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-[#0b1329] text-gray-300 relative overflow-hidden border-t border-slate-800">
      {/* Decorative top blur */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Newsletter & Alert Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-6 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Stay in the Loop
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get Instant Alerts for New PG Openings
              </h3>
              <p className="text-sm text-gray-400 max-w-lg">
                Be the first to know when luxury & budget-friendly PGs become available near your office or campus.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5 max-w-md lg:ml-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm sm:text-base flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white/10 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
              <img
                src="/new-logo/mainLogo-2.svg"
                alt="UrbanStayz Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              UrbanStayz is India's modern PG and co-living discovery network. Connecting students and professionals with zero-brokerage, 100% verified rooms across major tech cities.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Properties • Zero Brokerage</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center space-x-3">
              {[
                { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
                { icon: RiTwitterXLine, href: "https://twitter.com", label: "Twitter" },
                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: FaWhatsapp, href: "https://whatsapp.com", label: "WhatsApp" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-[#364a82] text-gray-300 hover:text-white flex items-center justify-center transition border border-slate-700/60 hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Home
                </Link>
              </li>
              <li>
                <Link to="/alllistings" className="text-gray-400 hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> All PG Listings
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> About UrbanStayz
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Contact Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-300 hover:text-amber-400 font-semibold transition flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" /> List a Property (Free)
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tech Hubs Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Top City Stays
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/alllistings?city=Bangalore" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Bangalore PGs</span>
                  <span className="text-[11px] text-gray-500">6 Stays</span>
                </Link>
              </li>
              <li>
                <Link to="/alllistings?city=Pune" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Pune Co-Living</span>
                  <span className="text-[11px] text-gray-500">3 Stays</span>
                </Link>
              </li>
              <li>
                <Link to="/alllistings?city=Delhi" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Delhi Student PGs</span>
                  <span className="text-[11px] text-gray-500">3 Stays</span>
                </Link>
              </li>
              <li>
                <Link to="/alllistings?city=Hyderabad" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Hyderabad Stays</span>
                  <span className="text-[11px] text-gray-500">1 Stay</span>
                </Link>
              </li>
              <li>
                <Link to="/alllistings?city=Mumbai" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Mumbai Youth Stays</span>
                  <span className="text-[11px] text-gray-500">1 Stay</span>
                </Link>
              </li>
              <li>
                <Link to="/alllistings?city=Noida" className="text-gray-400 hover:text-white transition flex items-center justify-between">
                  <span>Noida Techie PGs</span>
                  <span className="text-[11px] text-gray-500">1 Stay</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support & Headquarters Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Tower-8, Sector-62, Noida, Uttar Pradesh 201309</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white font-semibold transition">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@urbanstayz.com" className="hover:text-white font-semibold transition">
                  support@urbanstayz.com
                </a>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-500">
              <span className="block font-medium text-gray-400">Support Hours:</span>
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} UrbanStayz Technologies Pvt. Ltd. All rights reserved.</p>

          <p className="flex items-center gap-1 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in India by{" "}
            <strong className="text-white">Deepak Gupta</strong>
          </p>

          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-300 transition">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-300 transition">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
