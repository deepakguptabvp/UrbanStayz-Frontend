"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim()
    ) {
      toast.error("Please complete all fields.");
      return;
    }
    toast.success("User details saved successfully.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white md:px-10">
      {/* Details component */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:px-24 ">
        <div className="space-y-3 text-center mb-4">
          <h1 className="text-5xl font-bold font-serif "> Sign up</h1>
        </div>

        {/* Google login button */}
        <button className="flex border border-gray-600 rounded-xl px-4 py-2 cursor-pointer hover:border-emerald-600 hover:shadow-xl">
          <img src="./google-icon.png" alt="Google Icon" className="h-6 mr-2" />
          Login with Google
        </button>

        {/* User Details */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left space-y-2 px-8 py-4">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full md:w-80 rounded-xl px-4 py-2 border border-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full md:w-80 rounded-xl px-4 py-2 border border-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-1 font-medium text-gray-700"
              >
                Phone No
              </label>
              <input
                id="phoneNumber"
                name="phone"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    phone: digitsOnly,
                  }));
                }}
                placeholder="Enter your number"
                className="w-full md:w-80 rounded-xl px-4 py-2 border border-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-1 font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full md:w-80 rounded-xl px-4 py-2 border border-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="py-2 mt-6 md:w-80 text-lg font-serif rounded-full text-white bg-[#d28c14] hover:bg-[#946410] cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Login button */}
        <div className="-mt-2">
          Already a user.{" "}
          <Link to="/login">
            <strong className="text-[#d28c14] cursor-pointer hover:underline">
              Login
            </strong>
          </Link>
        </div>
      </div>

      {/* image component*/}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/signup-image-2.png"
          alt="Sign-up Image"
          className="object-contain h-80 md:h-150 md:p-14 md:w-full"
        />
      </div>
    </div>
  );
};

export default Signup;
