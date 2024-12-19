import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loader/Loading';

const Gatepassdetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [gatepassData, setGatepassData] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    fetch('https://campus-mate.onrender.com/gatepasseslist', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setGatepassData(sortedData);
      })
      .catch(error => console.error('Error fetching gatepass data:', error));
  }, []);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setSelectedStatuses(prevStatuses => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
  };

  const saveStatusChange = (id) => {
    const updatedStatus = selectedStatuses[id];

    if (updatedStatus) {
      fetch(`https://campus-mate.onrender.com/gatepass/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, status: updatedStatus }),
      })
        .then(response => response.json())
        .then(data => {
          setGatepassData(prevData => prevData.map(gatepass =>
            gatepass._id === id ? { ...gatepass, status: updatedStatus } : gatepass
          ));
          // Remove the save button once status is updated
          setSelectedStatuses(prevStatuses => ({
            ...prevStatuses,
            [id]: updatedStatus,
          }));
        })
        .catch(error => console.error('Error updating status:', error));
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />;
      case 'Rejected':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl" />;
      case 'Pending':
      default:
        return <FontAwesomeIcon icon={faSpinner} className="text-yellow-500 text-2xl animate-spin" />;
    }
  };

  if (!gatepassData.length) {
    return <div> <Loading loadingTime={2000}/></div>;
  }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-[#383433]`}>
        {gatepassData.map((gatepass, index) => (
          <div key={index} className="w-full bg-[#282524] shadow-md rounded-lg p-4 flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {gatepass.studentId ? `${gatepass.studentId.firstName} ${gatepass.studentId.lastName}` : 'Student Name'}
              </h3>
              <div className="text-sm text-gray-300">
                <p>EnrollmentID: {gatepass.enrollmentId}</p>
                <p>Time of Gatepass: {gatepass.outday}</p>
                <p>Out Time: {gatepass.outtime}</p>
                <p>In Time: {gatepass.intime}</p>
                <p>Out Date: {new Date(gatepass.outdate).toLocaleDateString()}</p>
                {gatepass.indate && <p>In Date: {new Date(gatepass.indate).toLocaleDateString()}</p>}
                <p>Reason: {gatepass.reason}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <label htmlFor={`status-${index}`} className="text-gray-300">Status:</label>
                {/* Show the dropdown only if the status is "Pending" */}
                {gatepass.status === 'Pending' ? (
                  <select
                    id={`status-${index}`}
                    value={selectedStatuses[gatepass._id] || gatepass.status}
                    onChange={(e) => handleStatusChange(e, gatepass._id)}
                    className="p-1 border border-gray-600 bg-gray-700 text-white rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <div className="text-gray-500">{gatepass.status}</div>
                )}
                <div className="ml-2">
                  {renderStatusIcon(selectedStatuses[gatepass._id] || gatepass.status)}
                </div>
              </div>

              {/* Show the Save button only if the status is "Pending" */}
              {(selectedStatuses[gatepass._id] === 'Pending' || gatepass.status === 'Pending') && (
                <button
                  onClick={() => saveStatusChange(gatepass._id)}
                  className="p-1 mt-2 bg-[#282524] text-white rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gatepassdetails;
