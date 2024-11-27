import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faExclamationCircle, faInfoCircle, faCheckCircle, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons'

const StudentComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/')
    }

    useEffect(() => {
        fetch('http://localhost:3005/complaintList', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    console.log(data);
                    setComplaints(data);
                } else {
                    console.error('Received data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching complaints:', error));
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

    const getIssueIcon = (issueType) => {
        switch (issueType) {
            case 'Maintenance':
                return faWrench;
            case 'Safety':
                return faExclamationCircle;
            case 'Information':
            default:
                return faInfoCircle;
        }
    };

    return (
        <>
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white">
                <div className="logo mb-4 md:mb-0">
                    <a href="#"><img src="./nameLogo.jpg" alt="logo" /></a>
                </div>

                <div className="nav__btns ml-auto">
                    <button className="btn bg-[#e82574] text-white py-2 px-4 rounded hover:bg-pink-500" onClick={() => handleLogout}>Logout</button>
                </div>
            </nav>
            {complaints.map((complaint, index) => {
                <div key={index} className="gatepass-details-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black">
                    <div className="left-side w-full md:w-1/2 mb-4 md:mb-0">
                        <p>Time of Gatepass: {complaint.outday}</p>
                        <p>Out Time: {complaint.outtime}</p>
                        <p>In Time: {complaint.intime}</p>
                        <p>Out Date: {new Date(complaint.outdate).toLocaleDateString()}</p>
                        {complaint.indate && <p>In Date: {new Date(complaint.indate).toLocaleDateString()}</p>}
                        <p>Reason: {complaint.reason}</p>
                    </div>
                    <div className="right-side w-full md:w-1/2 flex items-center justify-center md:justify-end">
                        <p><strong>Status:</strong> {getStatusIconAndText(complaint.status)}</p>
                    </div>
                </div>
            })}

        </>
    );
};

export default StudentComplaints;
