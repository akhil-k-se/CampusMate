import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loader/Loading';

const Navbar = ({ isShrunk }) => {
  const [wardenProfile, setWardenProfile] = useState(null);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("https://campus-mate.onrender.com/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Fetch Warden Data
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://campus-mate.onrender.com/admin/showData", {
        withCredentials: true,
      });
      setWardenProfile(response.data.admin);
      console.log("The response is ",wardenProfile);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      className={`bg-[#282524] text-white flex justify-between items-center px-4 py-3 transition-all duration-300 ${
        isShrunk ? "ml-[80px]" : "ml-[300px]"
      } ${isShrunk ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]"}`}
    >
      <div className="text-2xl font-bold text-white">Campus<span className='text-[#DFC9AC]'>Mate</span></div>
      <div className="flex items-center space-x-4">
        {wardenProfile ? (
          <div className="flex items-center space-x-2">
            <img
              src={wardenProfile.profilePic || "/default-profile.png"} // Use a default image if `imageUrl` is missing
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold">{wardenProfile.name || "Warden"}</span>
          </div>
        ) : (
          <Loading loadingTime={2000}/>
        )}
        <button
          className="btn bg-[#c4a47b] text-white py-2 px-4 rounded hover:bg-[#a48152]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
