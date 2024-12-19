import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios'; // Import axios
import Loading from '../../Loader/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SecurityDetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [securityData, setSecurityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://campus-mate.onrender.com/susecuritydetails', {
          withCredentials: true, 
        });

        console.log('Fetched security data:', response.data); 
        setSecurityData(response.data); // Set data to securityData state
      } catch (error) {
        console.error('Error fetching security data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (securityId) => { 
    try {
      console.log(`Attempting to delete security with ID: ${securityId}`);
      const response = await axios.delete(`https://campus-mate.onrender.com/gateSecurity/delete/${securityId}`, {
        withCredentials: true,
      });
      console.log('Delete response:', response.data);
      
      if (response.data.success) {
        setSecurityData((prevData) => prevData.filter((security) => security._id !== securityId)); 
        toast.success('SecurityGuard removed successfully!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                              });
      } else {
        toast.error('Failed to remove security', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error removing security:', error);
      toast.error('An error occurred while removing the security.', {
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
  if (securityData.length == 0) {
    toast.error("No Security Gaurd Found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return  <Loading />;
  }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? 'ml-[80px]' : 'ml-[300px]'} p-4 bg-gray-800`}>
      <ToastContainer />
        <div className="grid grid-cols-2 gap-4">
          {securityData.map((security) => ( 
            <div key={security._id} className="bg-gray-900 shadow-md rounded-lg p-4 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/150"
                alt={`${security.firstName} ${security.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Name: {security.name}</h3>
                <div className="text-sm text-gray-300">
                  <p>Email: {security.email}</p> 
                  <p>Hostel Name: {security.hostel}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(security._id)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove Security
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SecurityDetails;
