import React, { useState } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  const adminProfile = {
    name: 'Admin Name',
    email: 'admin@example.com',
    role: 'Warden',
    phone: '123-456-7890',
    department: 'IT Department',
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} bg-gray-800 flex justify-center items-center h-[91vh]`}>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-pink-700">
            <img 
              src={adminProfile.profilePicture} 
              alt={`${adminProfile.name}`} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-right text-white">
              <h3 className="text-lg font-semibold">{adminProfile.name}</h3>
              <p>{adminProfile.role}</p>
            </div>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Email</p>
              <p className="text-black break-words">{adminProfile.email}</p>
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-pink-500 ml-2 cursor-pointer" />}
            </div>
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Phone</p>
              <p className="text-black break-words">{adminProfile.phone}</p>
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-pink-500 ml-2 cursor-pointer" />}
            </div>
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Hostel Incharge</p>
              <p className="text-black break-words">{adminProfile.department}</p>
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-pink-500 ml-2 cursor-pointer" />}
            </div>
          </div>
          <div className="bg-gray-100 px-3 py-2 text-right">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-pink-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-pink-500 transition"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
