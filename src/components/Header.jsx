import { Menu, X, User, Building2, Phone, Home, Sparkles, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Listings", path: "/alllistings" },
    { name: "Top Cities", path: "/alllistings?sort=popular" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.search === path || location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-2.5"
          : "bg-white border-b border-gray-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group cursor-pointer"
          >
            <img
              src="/new-logo/mainLogo-2.svg"
              alt="UrbanStayz"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-blue-50 text-[#132350] shadow-xs font-bold"
                      : "text-gray-600 hover:text-[#132350] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 hover:bg-blue-100 transition border border-blue-200 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Host a PG</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 bg-[#132350] hover:bg-[#202e54] text-white px-5 py-2 rounded-xl text-sm font-semibold transition shadow-sm hover:shadow-md cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu & Sign In Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/login"
              className="bg-[#132350] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-xl py-4 px-6 space-y-3 z-50">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-[#132350] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-blue-900 bg-blue-50 border border-blue-200"
            >
              <Building2 className="w-4 h-4" />
              <span>Host a PG (Free Listing)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
