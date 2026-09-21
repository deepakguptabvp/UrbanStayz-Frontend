import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const HostBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#132350] via-[#1e3a8a] to-[#0f172a] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Pitch */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                <Sparkles className="w-3.5 h-3.5" /> For PG & Property Owners
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                List Your Property on <span className="text-amber-400">UrbanStayz</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Fill your vacant beds faster with verified working professionals and students. Enjoy zero listing fees, automated visit scheduling, and verified tenant profiles.
              </p>

              {/* Host Perks Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "100% Free Listing",
                  "Verified Tenant Inquiries",
                  "Automated Visit Bookings",
                  "Dedicated Host Manager",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: CTA Card */}
            <div className="lg:text-right flex flex-col sm:flex-row lg:flex-col justify-center items-start lg:items-end gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 max-w-md w-full text-left space-y-3">
                <h4 className="font-bold text-lg text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  Have a PG or Apartment to Rent?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Join our verified host network today and reach thousands of daily active room seekers in your city.
                </p>
                <button
                  onClick={() => {
                    navigate("/contact");
                    window.scrollTo(0, 0);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg text-sm sm:text-base"
                >
                  <span>List Your Property Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostBanner;
