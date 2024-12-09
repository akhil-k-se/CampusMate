import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios';  // Import Axios for making API calls
import Loading from '../../Loader/Loading';

function Dashboard1() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [wardens, setWardens] = useState(0);  // State to store the number of wardens
  const [securityGuards, setSecurityGuards] = useState(0);  // State to store the number of security guards
  const [loading, setLoading] = useState(true);  // Loading state to show loading message while fetching data
  const [error, setError] = useState(null);  // Error state to handle any errors during the API call

  // Fetch data from the backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch wardens count
        const wardenResponse = await axios.get('https://campus-mate.onrender.com/super-admin/wardens');
        setWardens(wardenResponse.data.length); // Count the number of wardens
        
        // Fetch security guards count
        const guardResponse = await axios.get('https://campus-mate.onrender.com/super-admin/guards');
        setSecurityGuards(guardResponse.data.length); // Count the number of guards

        setLoading(false);  // Set loading to false once the data is fetched
      } catch (error) {
        setError('Failed to load data');
        setLoading(false);  // Set loading to false if there is an error
      }
    };

    fetchCounts();
  }, []);

  // Show loading state while fetching data
  if (loading)  return <Loading loadingTime={2000}/>;

  // Show error if there is an issue fetching data
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />

      {/* Main container for centering the content */}
      <div className="flex justify-center items-center min-h-screen bg-gray-800 pl-[250px]">
        <div className="w-full max-w-3xl space-y-4">
          
          {/* Wardens Count Box */}
          <div className="bg-gray-900 shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Wardens Count</h2>
            <p className="text-white text-2xl">{wardens}</p>
          </div>

          {/* Security Guards Count Box */}
          <div className="bg-gray-900 shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Security Guards Count</h2>
            <p className="text-white text-2xl">{securityGuards}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard1;
