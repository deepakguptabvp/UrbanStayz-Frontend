import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../redux/slice/propertySlice";
import HeroSection from "../components/HeroSection";
import FeaturedListing from "../components/FeaturedListing";
import WhyChooseUs from "../components/WhyChooseUs";
import CityExplore from "../components/CityExplore";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import HostBanner from "../components/HostBanner";
import FaqSection from "../components/FaqSection";

const Home = () => {
  const [searchByLocation, setSearchByLocation] = useState("");
  const dispatch = useDispatch();

  const { properties, loading } = useSelector((state) => state.properties);

  // Fetch properties from MongoDB on initial mount
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Filter properties based on Hero search input
  const filteredPGs = properties.filter((pg) => {
    const loc = (pg.location || "").toLowerCase();
    const name = (pg.name || pg.title || "").toLowerCase();
    const query = searchByLocation.toLowerCase().trim();
    return loc.includes(query) || name.includes(query);
  });

  return (
    <div>
      {/* 1. Hero Search & Quick Filters */}
      <HeroSection onSearch={setSearchByLocation} />

      {/* 2. Featured Verified Listings (from MongoDB Atlas) */}
      <FeaturedListing listings={filteredPGs} loading={loading} />

      {/* 3. Why Choose UrbanStayz (Core Differentiators & Live Stats) */}
      <WhyChooseUs />

      {/* 4. Explore Top Tech Cities Grid */}
      <CityExplore />

      {/* 5. How It Works (3-Step Journey) */}
      <HowItWorks />

      {/* 6. Real Tenant Testimonials & Ratings */}
      <Testimonials />

      {/* 7. Property Owner / Host Partnership Banner */}
      <HostBanner />

      {/* 8. Frequently Asked Questions (Accordion) */}
      <FaqSection />
    </div>
  );
};

export default Home;
