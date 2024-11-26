import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Studentgatepass = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonPop, setButtonPop] = useState(false);

    const handleMenuButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
        setIsOpen(false);
    };

    const gatepassDetails = {
        date: "2024-09-01",
        time: "10:00 AM",
        purpose: "Medical check-up",
        destination: "City Hospital",
        status: "Pending"
    };

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

    return (
        <>
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white">
                <div className="logo mb-4 md:mb-0">
                    <a href="#"><img src="./nameLogo.jpg" alt="logo" /></a>
                </div>
                <div className="flex-grow text-center">
                    <ul className={`nav__links flex justify-center ${isOpen ? 'block' : 'hidden'}`} onClick={handleNavLinkClick}>
                        <li className="mx-2"><a href="#home" className="text-black">Home</a></li>
                        <li className="mx-2"><a href="#about" className="text-black">About</a></li>
                        <li className="mx-2"><a href="#service" className="text-black">Services</a></li>
                        <li className="mx-2"><a href="#explore" className="text-black">Explore</a></li>
                        <li className="mx-2"><a href="#contact" className="text-black">Contact</a></li>
                    </ul>
                </div>
                <div className="nav__btns ml-auto">
                    <button className="btn bg-[#e82574] text-white py-2 px-4 rounded hover:bg-pink-500" onClick={() => setButtonPop(true)}>Logout</button>
                </div>
            </nav>

            <div className="gatepass-details-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black">
                <div className="left-side w-full md:w-1/2 mb-4 md:mb-0">
                    <p><strong>Date Applied:</strong> {gatepassDetails.date}</p>
                    <p><strong>Time:</strong> {gatepassDetails.time}</p>
                    <p><strong>Purpose:</strong> {gatepassDetails.purpose}</p>
                    <p><strong>Destination:</strong> {gatepassDetails.destination}</p>
                </div>
                <div className="right-side w-full md:w-1/2 flex items-center justify-center md:justify-end">
                    <p><strong>Status:</strong> {getStatusIconAndText(gatepassDetails.status)}</p>
                </div>
            </div>
        </>
    );
};

export default Studentgatepass;
