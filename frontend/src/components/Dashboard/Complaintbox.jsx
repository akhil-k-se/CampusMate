import React, { useState } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faExclamationCircle, faInfoCircle, faCheckCircle, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';

const Complaintbox = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [complaint, setComplaint] = useState({
    issueType: 'Maintenance',
    issue: 'Leaky Faucet',
    description: 'The faucet in the bathroom is leaking and causing water wastage.',
    status: 'Under Processing',
  });

  const handleStatusChange = (e) => {
    setComplaint({ ...complaint, status: e.target.value });
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
        <div className="w-full bg-gray-900 text-white shadow-md rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-sm text-gray-300 mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <FontAwesomeIcon icon={getIssueIcon(complaint.issueType)} className="text-teal-400 text-xl" />
                  <p className="font-medium text-teal-400">{complaint.issueType}</p>
                </div>
                <p className="text-gray-200 font-semibold">Issue: {complaint.issue}</p>
                <p className="text-gray-400 mt-1">Description: {complaint.description}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <p className="font-medium text-gray-200">Status:</p>
                {getStatusIcon(complaint.status)}
                <select
                  value={complaint.status}
                  onChange={handleStatusChange}
                  className="ml-4 p-1 border border-gray-600 bg-gray-700 text-white rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Processing">Under Processing</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Complaintbox;
