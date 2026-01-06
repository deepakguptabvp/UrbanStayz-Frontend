import { FiFacebook } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative  bg-blue-950 text-white">
      {/* overlay gradient effect */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 opacity-90"></div>
      </div> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div>
            <div className="flex items-center">
              <img src="/new-logo/mainLogo-2.svg" alt="Logo" className="h-14 w-42 rounded-lg"  />
              {/* <span className="ml-2 text-xl font-bold text-white">
                UrbanStays
              </span> */}
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              Find furnished PGs, 1-BHK & 2-BHK apartments tailored for your
              needs.
            </p>
            <div className="mt-3 flex space-x-4">
              <Link
                to="#"
                title="Facebook"
                className="text-gray-300 hover:text-white transition"
              >
                <FiFacebook className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                title="Twitter"
                className="text-gray-300 hover:text-white transition"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                title="Instagram"
                className="text-gray-300 hover:text-white transition"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                title="LinkedIn"
                className="text-gray-300 hover:text-white transition"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/alllistings"
                  className="text-gray-300 hover:text-white transition"
                >
                  Featured Pg's
                </Link>
              </li>
              <li>
                <Link
                  to="/alllistings"
                  className="text-gray-300 hover:text-white transition"
                >
                  Featured Appartment
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-300">Delhi Best PG's</span>
              </li>
              <li>
                <span className="text-gray-300">Noida Appartments</span>
              </li>
              <li>
                <span className="text-gray-300">Gurgaon's furnished Flats</span>
              </li>
              <li>
                <span className="text-gray-300">Pune Luxury PG's</span>
              </li>
              <li>
                <span className="text-gray-300">Bangalore's Budget Luxury</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p>Noida, U.P. 201309</p>
              <p>Email: info@urbanstayz.com</p>
              <p>Phone: +91 9876543210</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-500 text-center text-gray-300 text-xs">
          <p>© {new Date().getFullYear()} UrbanStays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
