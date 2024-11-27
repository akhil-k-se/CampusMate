import axios from "axios";
import React, { useState, useEffect } from "react";
import gsap from "gsap";

const QRcode = () => {
  const enrollmentID = localStorage.getItem("enrollmentID");
  const [QRurl, setQRurl] = useState(null); // Store QR code URL
  const [userData, setUserData] = useState(null); // Store user data

  // Fetch QR code and user data
  const fetchQRCodeAndData = async () => {
    try {
      // Fetch QR code
      const qrResponse = await axios.get(
        `http://localhost:3005/get-qrcode/${enrollmentID}`,
        {
          withCredentials: true, // Include credentials for cookies
        }
      );
      setQRurl(qrResponse.data); // Assuming backend sends QR code in `qrCodeUrl`
      console.log("QR Code:", qrResponse.data);

      // Fetch user data
      const userResponse = await axios.get(
        "http://localhost:3005/student/showData",
        {
          withCredentials: true, // Include credentials for cookies
        }
      );
      setUserData(userResponse.data.user); // Assuming backend sends user data under `user`
      console.log("User Data:", userResponse.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  // Apply GSAP animation when QRurl or userData changes
  useEffect(() => {
    if (QRurl || userData) {
      gsap.to(".animated-div", { opacity: 1, duration: 1 });
    }
  }, [QRurl, userData]);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Button to fetch and display QR code and user data */}
      {userData == null ? (
        <button
          className="fetch-button mb-4 px-4 py-2 bg-white text-black rounded"
          onClick={fetchQRCodeAndData}
        >
          Fetch QR Code & User Data
        </button>
      ) : null}

      {userData == null ? null : (
        <div className="flex flex-wrap w-full h-[60%] items-center justify-center bg-white rounded-[10px] animated-div" style={{ opacity: 0 }}>
          {QRurl ? (
            <img
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
              src={QRurl}
              alt="QR Code"
            />
          ) : null}

          {userData ? (
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md flex flex-col justify-center items-center">
              <h2 className="text-lg font-bold mb-4 text-center">User Data</h2>
              <p>
                <strong>Enrollment ID:</strong> {userData.enrollmentID}
              </p>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              {/* Add more fields if needed */}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default QRcode;
