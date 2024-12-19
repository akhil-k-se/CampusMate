import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios'; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SecurityDetails = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [guardData, setGuardData] = useState([]); // Initializing with an empty array

    // Fetching warden data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://campus-mate.onrender.com/warden/mess', {
                    withCredentials: true, // Include credentials like cookies in the request
                });

                console.log('Fetched warden data:', response.data); // Log the raw data response
                setGuardData(response.data);
            } catch (error) {
                console.error('Error fetching warden data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (guardId) => {
        try {
            console.log(`Attempting to delete warden with ID: ${guardId}`);
            const response = await axios.delete(`https://campus-mate.onrender.com/mess/delete/${guardId}`, {
                withCredentials: true,
            });
            console.log('Delete response:', response.data);


            if (response.data.success) {
                setGuardData((prevData) => prevData.filter((guard) => 
                    guard._id != guardId
                ));
                toast.success('Guard removed successfully !', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
            } else {
                toast.error('Failed to remove guard', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        } catch (error) {
            toast.error('An error occurred while removing the guard.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }
    };



    return (
        <>
            <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
            <Navbar isShrunk={isShrunk} />
            <div className={`transition-all duration-300 ${isShrunk ? 'ml-[80px]' : 'ml-[300px]'} p-4 bg-[#383433]`}>
            <ToastContainer />
                <div className="grid grid-cols-2 gap-4">
                    {guardData.map((guard) => (
                        <div key={guard._id} className="bg-[#282524] shadow-md rounded-lg p-4 flex items-center space-x-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">Name: {guard.name}</h3>
                                <div className="text-sm text-gray-300">
                                    <p>Email: {guard.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(guard._id)} // Call handleDelete with warden's ID
                                className="text-red-500 hover:text-red-700 mt-2"
                            >
                                Remove Guard
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SecurityDetails;
