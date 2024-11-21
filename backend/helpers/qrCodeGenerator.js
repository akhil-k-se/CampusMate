const QRCode = require("qrcode");
const student = require('../models/studentModel');

const generateQR = async (enrollmentID) => {
    try {
        const apiURL = `http://localhost:3005/qr-scan/${enrollmentID}`;
        const qrCodeURL = await QRCode.toDataURL(apiURL);
        return qrCodeURL;
      } catch (error) {
        console.error("Error generating QR Code:", error);
        throw error;
      }
}

module.exports = generateQR;
