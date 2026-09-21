import { useState } from "react";
import toast from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle2,
  Sparkles,
  Headphones,
} from "lucide-react";
import { submitContactMessage } from "../services/propertyApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields (First name, Email, Message).");
      return;
    }

    setLoading(true);
    try {
      await submitContactMessage(formData);
      setSubmitted(true);
      toast.success("Thank you for reaching out! Our team will get back to you shortly.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to send your message. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#132350] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
            <Headphones className="w-3.5 h-3.5" /> We're Here to Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Get in Touch with <span className="text-amber-400">UrbanStayz</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about room availability, pricing, or want to list your property? Reach out anytime!
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 1 Column: Direct Contact Info & Support Lines */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-900" />
                <span>Contact Details</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase">
                      Phone Number
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="font-bold text-gray-900 hover:text-blue-900 transition"
                    >
                      +91 98765 43210
                    </a>
                    <span className="block text-xs text-gray-500">Mon - Sat, 9 AM to 8 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase">
                      Email Address
                    </span>
                    <a
                      href="mailto:support@urbanstayz.com"
                      className="font-bold text-gray-900 hover:text-blue-900 transition"
                    >
                      support@urbanstayz.com
                    </a>
                    <span className="block text-xs text-gray-500">Quick response within 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase">
                      Headquarters
                    </span>
                    <p className="font-bold text-gray-900">
                      Tower-8, Sector-62, Noida
                    </p>
                    <span className="block text-xs text-gray-500">Uttar Pradesh 201309, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase">
                      Working Hours
                    </span>
                    <p className="font-bold text-gray-900">
                      9:00 AM - 8:00 PM (IST)
                    </p>
                    <span className="block text-xs text-gray-500">Sunday Emergency Support Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Inquiries Card */}
            <div className="bg-[#132350] text-white rounded-3xl p-6 shadow-md space-y-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" /> For Property Owners
              </span>
              <h4 className="font-bold text-lg">
                Want to list your PG on UrbanStayz?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Connect directly with our host onboarding team to get your property listed with verified photos within 24 hours.
              </p>
              <a
                href="mailto:hosts@urbanstayz.com"
                className="inline-block text-xs font-bold text-amber-300 underline hover:text-white transition"
              >
                hosts@urbanstayz.com →
              </a>
            </div>
          </div>

          {/* Right 2 Columns: Interactive Message Form (Connected to Backend) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Send a Direct Inquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Leave Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Fill out this quick form and our support manager will get back to you via call or email.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>
                  Thank you! Your message has been safely received. We will respond promptly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="e.g. Deepak"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Gupta"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone: digits }));
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  How can we help you? *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Ask about a specific PG in Bangalore, schedule assistance, rent inquiry, or partner with us..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm transition leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#132350] hover:bg-[#202e54] text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 text-sm sm:text-base"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{loading ? "Sending Message..." : "Submit Inquiry"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Three Support Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Tenant Support</h4>
            <p className="text-xs text-gray-500">
              Need help finding a stay or have questions about an active visit?
            </p>
            <a
              href="mailto:support@urbanstayz.com"
              className="text-xs font-bold text-blue-900 hover:underline inline-block pt-1"
            >
              support@urbanstayz.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Host Partnerships</h4>
            <p className="text-xs text-gray-500">
              List your PG or managed apartment with 0% platform listing fee.
            </p>
            <a
              href="mailto:hosts@urbanstayz.com"
              className="text-xs font-bold text-amber-700 hover:underline inline-block pt-1"
            >
              hosts@urbanstayz.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Corporate & Group Stays</h4>
            <p className="text-xs text-gray-500">
              Bulk booking for interns, tech companies, and college batches.
            </p>
            <a
              href="mailto:corporate@urbanstayz.com"
              className="text-xs font-bold text-emerald-700 hover:underline inline-block pt-1"
            >
              corporate@urbanstayz.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
