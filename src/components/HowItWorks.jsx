import { BsPeopleFill } from "react-icons/bs";
import { MdManageSearch, MdOutlineMapsHomeWork } from "react-icons/md";
import { FcSearch } from "react-icons/fc";

const HowItWorks = () => {
  return (
    <section className="py-16  bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How UrbanStayz Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your perfect stay is easy with our simple three-step
            journey.
          </p>
        </div>

        {/* Search - Visit - Connect */}
        <div className="relative md:mt-20 grid gap-18 grid-cols-1 md:grid-cols-3">
          {/* line */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-blue-900" />
          {/* all 3's   */}
          <div className="relative text-center space-y-3">
            <h3 className="-mt-10 text-[16px] font-medium text-gray-900">
              Step-1
            </h3>
            <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center hover:scale-125">
              {/* <FcSearch  className="h-8 w-8 text-blue-900" /> */}
              <img
                src="/search.png"
                alt="Search Icon"
                className="h-8 w-8 text-blue-900 bg-white"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Discover</h3>
            <p className="mt-2 text-base text-gray-600 max-w-2xs">
              Use smart filters to explore fully verified PGs and rentals based
              on your location, budget, amenities, and lifestyle.
            </p>
          </div>
          <div className="relative text-center space-y-3">
            <h3 className="-mt-10 text-[16px] font-medium text-gray-900">
              Step-2
            </h3>
            <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center hover:scale-125">
              {/* <BsPeopleFill className="h-8 w-8 text-blue-900" /> */}
              <img
                src="/experience.png"
                alt="Search Icon"
                className="h-10 w-10 text-blue-900"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">
              Experience
            </h3>
            <p className="mt-2 text-base text-gray-600 max-w-2xs">
              Schedule an in-person visit or take a virtual tour to get a real
              feel of the property before making your choice.
            </p>
          </div>
          <div className="relative text-center space-y-3">
            <h3 className="-mt-10 text-[16px] font-medium text-gray-900">
              Step-3
            </h3>
            <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center hover:scale-125">
              {/* <MdOutlineMapsHomeWork className="h-8 w-8 text-blue-900 " /> */}
              <img
                src="/apartment.png"
                alt="Search Icon"
                className="h-10 w-10 text-blue-900"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Move In</h3>
            <p className="mt-2 text-base text-gray-600 max-w-2xs">
              Talk directly with property owners to finalize your booking and
              settle into your new home hassle-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
