"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import contactDetails from "../data/contact";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    toast.success("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white">
      {/* Image div */}
      <div className="flex flex-col justify-center items-center w-full mx-auto">
        <div className="relative h-[360px] min-w-full">
          <img
            src="/contact/contact-2.webp"
            alt="Contact Us Image"
            className="absolute inset-0 w-full h-full object-cover object-[20%_30%]"
          />
          {/* overlay black shade over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        </div>
      </div>

      {/* Contact Form section */}
      <div className="max-w-3xl px-4 py-10 text-gray-800 space-y-3  mx-auto">
        <h1 className="text-4xl text-blue-900 text-center justify-center ">
          Send us a <strong> Message</strong>
        </h1>
        <p className="max-w-xl mb-8 text-gray-700 text-md md:text-lg items-center justify-center ">
          Have questions, suggestions, or need help? Fill out the form below and
          we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="shadow-2xl md:p-6 rounded-2xl">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row gap-10">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name*"
                required
                className="w-full border px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-700"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name*"
                required
                className="w-full border px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-700"
              />
            </div>

            <div className="flex flex-row gap-10">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                required
                className="w-full border px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-700"
              />
              <input
                type="number"
                name="number"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone No*"
                required
                className="w-full border px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-700"
              />
            </div>

            <textarea
              name="message"
              placeholder="Type your message..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-700"
            />

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-3xl transition cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-7xl container mx-auto w-full px-5 md:px-0 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="italic font-bold text-sm md:text-base">
              Get in Touch
            </h1>
            <h1 className="text-3xl md:text-[46px] font-bold text-center text-gray-700">
              Find Your <span className="text-blue-900">Perfect Room</span>
            </h1>
            <p className="text-gray-500 max-w-3xl text-center text-base">
              Whether you're looking for a cozy PG or a spacious apartment — our
              team is here to help you find your ideal home with ease and
              confidence.
            </p>
          </div>

          {/* 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {contactDetails.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-start text-center space-y-4 ${
                  index !== contactDetails.length - 1
                    ? "md:border-r-1 md:pr-8 "
                    : ""
                }`}
              >
                {/* Icon Circle  */}
                <div className="w-14 h-14 flex items-center justify-center bg-blue-900 rounded-full">
                  <img src={item.icon} alt={item.label} className="w-7 h-7" />
                </div>
                {/* Text  */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">{item.label}</h3>
                  <p className="text-black/60 max-w-64 text-sm font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
