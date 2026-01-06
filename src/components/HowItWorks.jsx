import howItWorksData from "../data/howitworksData";

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
        <div className="relative md:mt-20 grid lg:gap-18 grid-cols-1 md:grid-cols-3 items-center justify-center">
          {/* Connecting Line */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-blue-900 hidden md:block" />

          {howItWorksData.map((item) => (
            <div key={item.step} className="relative text-center space-y-3 mt-2 mb-6">
              <h3 className="md:-mt-10 text-[16px] font-medium text-gray-900">
                {item.step}
              </h3>

              <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center hover:scale-125 transition-transform">
                <img
                  src={item.icon}
                  alt={item.title}
                  className={`${item.iconSize} bg-white`}
                />
              </div>

              <h3 className="mt-6 text-xl font-medium text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-base text-gray-600 max-w-2xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
