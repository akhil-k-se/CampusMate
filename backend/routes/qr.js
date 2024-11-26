const MessSecurity = require("../models/messSecurity");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";

/**
 * Process QR code scans
 */
const processQR = async (req, res) => {
  const token = req.headers.authorization;
  const { qrData } = req.body;

  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure the user is a security guard
    const messSecurity = await MessSecurity.findById(decoded.id);
    if (!messSecurity || messSecurity.role !== "MessSecurity") {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    // Process the QR data (this is where you define your logic)
    // For example, fetch user details from the database using `qrData`
    const userDetails = await getUserDetailsFromQR(qrData); // Replace with your logic

    if (!userDetails) {
      return res.status(404).json({ msg: "QR code data not found" });
    }

    res.json({ msg: "QR code processed successfully", data: userDetails });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// Mock function to fetch user details based on QR data
const getUserDetailsFromQR = async (qrData) => {
  // Replace this with your actual database logic
  return { name: "John Doe", enrollmentID: qrData };
};

module.exports = { processQR };