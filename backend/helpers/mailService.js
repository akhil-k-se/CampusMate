const nodemailer = require("nodemailer");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true, // Use true for port 465
  port: 465,
  // auth: {
  //   user: "hotlineclasher123@gmail.com", // Your email
  //   pass: "vmstabqosxczxezq",           // App password
  // },
  auth: {
    user: "campusmate96@gmail.com", // Your email
    pass: "llaaumnvkaayfsnz",           // App password
  },
});


/**
 * Sends an email using the specified details.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Body text of the email.
 * @returns {Promise} Resolves with email info if successful, rejects with an error if failed.
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "hotlineclasher123@gmail.com", // Sender's email address
    to,                                 // Receiver's email address
    subject,                            // Email subject
    text,                               // Email text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
