import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTshirt, faBed } from '@fortawesome/free-solid-svg-icons';

const Studentdetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/reservationlist', {
      method: 'GET',
      credentials: 'include', // Include credentials for cookies
    })
      .then(response => response.json())
      .then(data => {
        setStudentData(data.data);
      })
      .catch(error => console.error('Error fetching student data:', error));
  }, []);
  

  if (!studentData.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-gray-800`}>
        <div className="grid grid-cols-2 gap-4"> {/* Updated to show two columns */}
          {studentData.map((student) => (
            <div key={student._id} className="bg-gray-900 shadow-md rounded-lg p-4 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/150"
                alt={`${student.firstName} ${student.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{`${student.firstName} ${student.lastName}`}</h3>
                <div className="text-sm text-gray-300">
                  <p>Gender: {student.gender}</p>
                  <p>Email: {student.email}</p>
                  <p>Enrollment Number: {student.enrollmentNumber}</p>
                  <p>Room Type: {student.roomtype}</p>
                  <p>Hostel Name: {student.hostelname}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-1">
                  <FontAwesomeIcon icon={faUtensils} className="text-white text-xl" />
                  <span className="text-pink-500 text-xl">✔️</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FontAwesomeIcon icon={faTshirt} className="text-white text-xl" />
                  <span className="text-pink-500 text-xl">✔️</span> 
                </div>
                <div className="flex items-center space-x-1">
                  <FontAwesomeIcon icon={faBed} className="text-white text-xl" />
                  <span className="text-pink-500 text-xl">✔️</span> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Studentdetails;
