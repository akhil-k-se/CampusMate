import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from 'axios'

const QRScanner = () => {
  const [error, setError] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader", // The ID of the div where the scanner renders
        {
          fps: 10, // Frames per second for scanning
          qrbox: { width: 250, height: 250 }, // Scanner viewport size
        },
        false
      );

      // Function to handle the QR scan
      const handleScan = async (decodedText) => {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // If token exists, send the request
        if (token) {
          try {
            // Send the QR scan result along with the token to your backend
            const response = await fetch(
              "http://localhost:3005/getTokenForSecurity",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Add token in Authorization header
                },
                credentials: "include",
                body: JSON.stringify({ scanResult: decodedText }),
              }
            );

            const data = await response.json();

            if (response.ok) {
              console.log("Scan result sent successfully", data);
            } else {
              console.error("Failed to send scan result", data);
            }
          } catch (error) {
            console.error("Error sending scan result:", error);
          }
        }

        // Open the QR scanned URL in a new tab
        window.open(decodedText, "_blank");

        // Clear the scanner to reset it
        scanner.clear(); // Stop scanning

        // Re-render the scanner to reset and keep it active for the next scan
        scanner.render(handleScan, handleError);
      };

      // Function to handle scan errors
      const handleError = (err) => {
        setError("Scanning failed. Please try again.");
        console.error("QR Scanning Error: ", err);
      };

      // Start the scanner
      scanner.render(handleScan, handleError);

      // Store the scanner instance to scannerRef.current
      scannerRef.current = scanner;
    }

    // Cleanup: Ensure we don't stop the scanner on component unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear(); // Stop scanning when the component unmounts
        scannerRef.current = null;
      }
    };
  }, []);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3005/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        navigate("/mess");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="grid grid-cols-3">
        <div className="col-span-1/3"></div>
        <h1 className="text-3xl font-bold mb-4 text-white">QR Code Scanner</h1>
        <button className="bg-pink-500" onClick={handleLogout}>Hello</button>
      </div>
      <div className="bg-white w-[98%] h-[70%] flex flex-col items-center justify-center rounded-[10px]">

        <div id="reader" className="w-full max-w-sm mb-4"></div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
            <h2 className="text-lg font-semibold">Instructions:</h2>
            Reload The Page After each scan
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
