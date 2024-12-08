import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isShrunk, setIsShrunk }) => {
  const toggleSidebar = () => {
    setIsShrunk(!isShrunk);
  };

  return (
    <div className={`fixed top-0 bottom-0 ${isShrunk ? "w-[80px]" : "w-[300px]"} bg-gray-900 p-2 transition-all duration-300`}>
      <span className='absolute text-white text-4xl top-3 left-4 cursor-pointer' onClick={toggleSidebar}>
        <i className={`bi ${isShrunk ? "bi-filter-right" : "bi-filter-left"} px-2 bg-[#e82574] rounded-md`}></i>
      </span>

      <div className="text-center text-gray-100 mt-20">
        <Link to="/warden/dashboard" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-house-door-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Dashboard</span>
        </Link>

        <Link to="/warden/student-details" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-backpack-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Student Details</span>
        </Link>

        <Link to="/warden/create/mess-security" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>MessSecurity</span>
        </Link>

        <Link to="/warden/gatepasses" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-calendar-week-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Gate Passes</span>
        </Link>

        <Link to="/warden/complaints" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-box-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Complaint Box</span>
        </Link>

        <Link to="/warden/update/mess-menu" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-box-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Mess Menu</span>
        </Link>

        <Link to="/warden/my-account" className='p-2.5 flex items-center rounded-md px-4 mt-20 duration-300 cursor-pointer group hover:bg-gray-600'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-[#e82574]'></i>
          <span className={`text-[17px] ml-4 text-gray-300 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Account</span>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;