import React from 'react';

const Navbar = ({ isShrunk }) => {
  return (
    <div
      className={`bg-gray-900 text-white flex justify-between items-center px-4 py-3 transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} ${isShrunk ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]"} `}
    >
      <div className="text-2xl font-bold text-[#e82574]">
        Hostel Sync
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
