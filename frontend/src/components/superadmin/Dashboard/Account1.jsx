import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTshirt, faBed } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios

const Account1 = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [studentData, setStudentData] = useState([]); // Initializing with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/suwarden', {
          withCredentials: true, // Include credentials like cookies in the request
        });

        console.log('Fetched student data:', response.data); // Log the raw data response
        setStudentData(response.data); 
        console.log('Student data length:', response.data.length); 
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  if (studentData.length === 0) {
    return <div>Loading...</div>; 
  }

  console.log('Student data length in render:', studentData.length); // Log the length of studentData on each render

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      
    </>
  );
};

export default Account1;
