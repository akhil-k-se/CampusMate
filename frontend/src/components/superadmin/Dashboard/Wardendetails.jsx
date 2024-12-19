import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios'; // Import axios
import Loading from '../../Loader/Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wardendetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [wardenData, setWardenData] = useState([]); // Initializing with an empty array

  // Fetching warden data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://campus-mate.onrender.com/super-admin/wardens', {
          withCredentials: true, // Include credentials like cookies in the request
        });

        console.log('Fetched warden data:', response.data); // Log the raw data response
        setWardenData(response.data);
      } catch (error) {
        console.error('Error fetching warden data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (wardenId) => {
    try {
      console.log(`Attempting to delete warden with ID: ${wardenId}`);
      const response = await axios.delete(`https://campus-mate.onrender.com/admin/delete/${wardenId}`, {
        withCredentials: true,
      });
      console.log('Delete response:', response.data);

      if (response.data.success) {
        setWardenData((prevData) => prevData.filter((warden) => warden._id !== wardenId));
        toast.success('Warden removed successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to remove warden', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                              });
      }
    } catch (error) {
      console.error('Error removing warden:', error);
      toast.error('An error occurred while removing the warden.', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
    }
  };

  // Show a loading message while the data is being fetched
  if (wardenData.length == 0) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? 'ml-[80px]' : 'ml-[300px]'} p-4 bg-gray-800`}>
      <ToastContainer />
        <div className="grid grid-cols-2 gap-4">
          {wardenData.map((warden) => (
            <div key={warden._id} className="bg-gray-900 shadow-md rounded-lg p-4 flex items-center space-x-2">
              <img
                src={warden.profilePic}
                alt={`${warden.firstName} ${warden.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Name: {warden.name}</h3>
                <div className="text-sm text-gray-300">
                  <p>Email: {warden.email}</p>
                  <p>Hostel Name: {warden.hostel}</p>
                  <p>Role: {warden.role}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(warden._id)} // Call handleDelete with warden's ID
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove Warden
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wardendetails;
