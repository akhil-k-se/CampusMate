const MessSecurity = require("../models/messSecurity");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET


const processQR = async (req, res) => {
  const token = req.headers.authorization;
  const { qrData } = req.body;

  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

 
    const messSecurity = await MessSecurity.findById(decoded.id);
    if (!messSecurity || messSecurity.role !== "MessSecurity") {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    
    const userDetails = await getUserDetailsFromQR(qrData);

    if (!userDetails) {
      return res.status(404).json({ msg: "QR code data not found" });
    }

    res.json({ msg: "QR code processed successfully", data: userDetails });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const getUserDetailsFromQR = async (qrData) => {
 
  return { name: "John Doe", enrollmentID: qrData };
};

module.exports = { processQR };