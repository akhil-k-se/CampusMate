import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios'; // Import axios

const Wardendetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [wardenData, setWardenData] = useState([]); // Initializing with an empty array

  // Fetching warden data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hostel-sync-1.onrender.com/super-admin/wardens', {
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
      const response = await axios.delete(`https://hostel-sync-1.onrender.com/admin/delete/${wardenId}`, {
        withCredentials: true,
      });
      console.log('Delete response:', response.data);

      if (response.data.success) {
        setWardenData((prevData) => prevData.filter((warden) => warden._id !== wardenId));
        alert('Warden removed successfully!');
      } else {
        alert('Failed to remove warden');
      }
    } catch (error) {
      console.error('Error removing warden:', error);
      alert('An error occurred while removing the warden.');
    }
  };

  // Show a loading message while the data is being fetched
  if (wardenData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? 'ml-[80px]' : 'ml-[300px]'} p-4 bg-gray-800`}>
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
