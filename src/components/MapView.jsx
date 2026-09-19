import React from "react";

const MapView = ({ rooms = [] }) => {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-200">
      <p className="text-gray-600 font-medium">Map View</p>
      <p className="text-sm text-gray-400 mt-1">
        {rooms.length > 0
          ? `Showing ${rooms.length} locations`
          : "No locations available"}
      </p>
    </div>
  );
};

export default MapView;
