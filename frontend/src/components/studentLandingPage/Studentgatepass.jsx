import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Studentgatepass = () => {
    const [gatepassData, setGatepassData] = useState([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchGatePasses = async () => {
            try {
                const response = await axios.get('https://campus-mate.onrender.com/student/stdGatePassList', {
                    withCredentials: true,
                });
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setGatepassData(sortedData);
            } catch (err) {
                const errorMssg = err.response?.data?.msg || "An error occurred";
                console.error('Error fetching gatepass data:', errorMssg);
                toast.error(errorMssg || "An error occurred.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          });
            }

        }

        fetchGatePasses();
    }, []);

    const getStatusIconAndText = (status) => {
        switch (status) {
            case 'Approved':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl mr-2" />
                        <span className="text-green-500">{status}</span>
                    </div>
                );
            case 'Rejected':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl mr-2" />
                        <span className="text-red-500">{status}</span>
                    </div>
                );
            case 'Pending':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSpinner} className="text-yellow-500 text-2xl mr-2 animate-spin" />
                        <span className="text-yellow-500">{status}</span>
                    </div>
                );
            default:
                return null;
        }
    };
    const handleBack = ()=>{
        navigate('/student');
    }

    return (
        <>
        <ToastContainer />
              <div>
                <button
                  onClick={handleBack}
                  className=" mb-4 px-4 py-2 bg-white text-black rounded flex items-center justify-center gap-2 absolute top-5 left-5 "
                >
                  <IoArrowBack /> Back
                </button>
              </div>
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white">
                <div className="logo mb-4 md:mb-0">
                    <a href="#"><img src="https://res.cloudinary.com/dhwaifalx/image/upload/v1732710122/logo-campusMate_m90scm.png" alt="logo" /></a>
                </div>
                <div className="nav__btns ml-auto">
                    <button className="btn bg-[#282524] text-white py-2 px-4 rounded hover:bg-[#a48152]"
                        onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="gatepass-container">
                {gatepassData.map((gatepass, index) => (
                    <div key={index} className="gatepass-details-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black">
                        <div className="left-side w-full md:w-1/2 mb-4 md:mb-0">
                            <p>Time of Gatepass: {gatepass.outday}</p>
                            <p>Out Time: {gatepass.outtime}</p>
                            <p>In Time: {gatepass.intime}</p>
                            <p>Out Date: {new Date(gatepass.outdate).toLocaleDateString()}</p>
                            {gatepass.indate && <p>In Date: {new Date(gatepass.indate).toLocaleDateString()}</p>}
                            <p>Reason: {gatepass.reason}</p>
                        </div>
                        <div className="right-side w-full md:w-1/2 flex items-center justify-center md:justify-end">
                            <p><strong>Status:</strong> {getStatusIconAndText(gatepass.status)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Studentgatepass;

