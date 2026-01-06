import { MenuIcon, XIcon, HomeIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-md sticky top-0 z-10 bg-white md:h-20 lg:h-20 h-auto py-2 sm:py-3 px-2 sm:px-4 flex items-center border-b-2 border-blue-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
        <div className="flex justify-between items-center my-auto w-full">
          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/new-logo/mainLogo-2.svg"
              loading="lazy"
              alt="Company Logo"
              className="h-12 w-32 md:h-14 md:w-42"
            />

            {/* <span className="ml-3 md:text-2xl font-bold text-blue-950 ">
              UrbanStayz
            </span> */}
          </Link>

          {/* Toggle Button for Mobile & Tablet */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <Link
              to="/login"
              onClick={() => isMenuOpen && toggleMobileMenu()}
              className="bg-[#364a82] text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md transition hover:bg-[#2b3b67] cursor-pointer text-xs sm:text-sm flex items-center gap-1"
            >
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden xs:inline">Sign In</span>
            </Link>
            <button
              title="Explore"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isMenuOpen ? (
                <XIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 right-0 bg-white shadow-md lg:shadow-none lg:static lg:block lg:w-auto`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-1 lg:gap-4 p-3 lg:p-0 text-sm lg:text-base font-medium">
              <Link
                to="/"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                Home
              </Link>
              <Link
                to="/alllistings"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                Listings
              </Link>
              <Link
                to="/alllistings"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                Explore
              </Link>
              <Link
                to="/alllistings"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                Cities
              </Link>
              <Link
                to="/about"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => isMenuOpen && toggleMobileMenu()}
                className="text-gray-700 hover:underline px-2 py-2 hover:text-[#364a82] transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <Link
            to="/login"
            onClick={() => isMenuOpen && toggleMobileMenu()}
            className="hidden lg:flex bg-[#364a82] text-white px-4 py-2 rounded-md transition hover:bg-[#2b3b67] cursor-pointer text-sm"
          >
            <div className="flex justify-center items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>Sign In</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
