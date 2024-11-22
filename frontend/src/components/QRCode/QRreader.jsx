import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

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
            const response = await fetch('http://localhost:3005/getTokenForSecurity', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add token in Authorization header
              },
              credentials: 'include',
              body: JSON.stringify({ scanResult: decodedText }),
            });

            const data = await response.json();

            if (response.ok) {
              console.log('Scan result sent successfully', data);
            } else {
              console.error('Failed to send scan result', data);
            }
          } catch (error) {
            console.error('Error sending scan result:', error);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
      <div id="reader" className="w-full max-w-sm mb-4"></div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <h2 className="text-lg font-semibold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;