import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isShrunk, setIsShrunk }) => {
  const toggleSidebar = () => {
    setIsShrunk(!isShrunk);
  };

  return (
    <div className={`fixed top-0 bottom-0 ${isShrunk ? "w-[80px]" : "w-[300px]"} bg-[#0a1c37] p-2 transition-all duration-300`}>
      <span className='absolute text-white text-4xl top-3 left-4 cursor-pointer' onClick={toggleSidebar}>
        <i className={`bi ${isShrunk ? "bi-filter-right" : "bi-filter-left"} px-2 bg-[#2573e8] rounded-md`}></i>
      </span>

      <div className="text-center text-gray-100 mt-20">
        <Link to="/super-admin/dashboard" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-[#2573e8]'>
          <i className='bi bi-house-door-fill text-xl px-3 py-2 rounded-md bg-[#2573e8]'></i>
          <span className={`text-[17px] ml-4 text-[#acccfc] font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Dashboard</span>
        </Link>

        <Link to="/super-admin/warden/create" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-[#2573e8]'>
          <i className='bi bi-backpack-fill text-xl px-3 py-2 rounded-md bg-[#2573e8]'></i>
          <span className={`text-[17px] ml-4 text-[#acccfc] font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Create Warden</span>
        </Link>

        <Link to="/super-admin/warden/details" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-[#2573e8]'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-[#2573e8]'></i>
          <span className={`text-[17px] ml-4 text-[#acccfc] font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Warden Details</span>
        </Link>

        <Link to="/super-admin/guard/create" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-[#2573e8]'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-[#2573e8]'></i>
          <span className={`text-[17px] ml-4 text-[#acccfc] font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Create Guard</span>
        </Link>

        <Link to="/super-admin/guard/details" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-[#2573e8]'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-[#2573e8]'></i>
          <span className={`text-[17px] ml-4 text-[#acccfc] font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Guard Details</span>
        </Link>


      </div>
    </div>
  );
};

export default Sidebar;
