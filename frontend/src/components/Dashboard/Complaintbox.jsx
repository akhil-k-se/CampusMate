import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faExclamationCircle, faInfoCircle, faCheckCircle, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';

const Complaintbox = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({}); // Track selected statuses

  // Fetch complaints and initialize status on page load
  useEffect(() => {
    fetch('https://hostel-sync-1.onrender.com/complaintList', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Initialize selectedStatuses with the current statuses from backend data
          const initialStatuses = data.reduce((acc, complaint) => {
            acc[complaint._id] = complaint.status; // set initial status for each complaint
            return acc;
          }, {});
          setComplaints(data);
          setSelectedStatuses(initialStatuses);
        } else {
          console.error('Received data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  // Handle status change in dropdown
  const handleStatusChange = (e, id) => {
    const updatedStatus = e.target.value;
    setSelectedStatuses(prevStatuses => ({
      ...prevStatuses,
      [id]: updatedStatus, // Update local state to reflect status change
    }));
  };

  // Save the status change to backend
  const saveStatusChange = (id) => {
    const updatedStatus = selectedStatuses[id]; // Get the updated status from state
    if (updatedStatus) {
      fetch(`https://hostel-sync-1.onrender.com/complaint/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, status: updatedStatus }), // Send the updated status to backend
      })
        .then(response => response.json())
        .then(updatedComplaint => {
          // Once the status is successfully updated on the backend, update the local complaints array
          setComplaints(prevComplaints =>
            prevComplaints.map(complaint =>
              complaint._id === id ? { ...complaint, status: updatedStatus } : complaint
            )
          );
        })
        .catch(error => console.error('Error updating status:', error));
    }
  };

  // Get the icon based on the issue type
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

  // Get the icon based on the complaint status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />;
      case 'Under Processing':
        return <FontAwesomeIcon icon={faSpinner} className="text-yellow-500 text-2xl animate-spin" />;
      case 'Pending':
      default:
        return <FontAwesomeIcon icon={faClock} className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-gray-800`}>
        {complaints.length === 0 ? (
          <div className="text-white">No complaints available</div>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint._id} className="w-full bg-gray-900 text-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-300 mt-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <FontAwesomeIcon icon={getIssueIcon(complaint.issueType)} className="text-teal-400 text-xl" />
                      <p className="font-medium text-teal-400">{complaint.issueType}</p>
                      <p className="font-medium text-teal-400">{complaint.enrollmentId}</p>
                    </div>
                    <p className="text-gray-200 font-semibold">Issue: {complaint.issue}</p>
                    <p className="text-gray-400 mt-1">Description: {complaint.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <p className="font-medium text-gray-200">Status:</p>
                    {getStatusIcon(selectedStatuses[complaint._id] || complaint.status)}
                    <select
                      value={selectedStatuses[complaint._id] || complaint.status}
                      onChange={(e) => handleStatusChange(e, complaint._id)}
                      className="ml-4 p-1 border border-gray-600 bg-gray-700 text-white rounded"
                      disabled={selectedStatuses[complaint._id] === 'Resolved'} // Disable select if status is "Resolved"
                    >
                      <option value="Pending" disabled={selectedStatuses[complaint._id] === 'Resolved'}>Pending</option>
                      <option value="Under Processing" disabled={selectedStatuses[complaint._id] === 'Resolved'}>Under Processing</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => saveStatusChange(complaint._id)}
                      className="ml-4 p-1 bg-[#e82574] text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Complaintbox;
