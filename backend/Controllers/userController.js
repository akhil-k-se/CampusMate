const User = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const QRcode = require("../helpers/qrCodeGenerator");
const Admin = require("../models/adminModel");
const Reservation = require("../models/reservationModel");
const GatePass = require("../models/gatepassModel");
const Complaint = require("../models/complaintModel");
const SendMail = require("../helpers/mailService");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


const register = async (req, res) => {
  try {
    const { name, email, password, enrollmentID } = req.body;

    if (!name || !email || !password || !enrollmentID) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (/\d/.test(name)) {
      return res.status(400).json({ msg: "Name should not contain numbers" });
    }

    if (enrollmentID < 2010990000) {
      return res.status(400).json({ msg: "Enter a valid enrollmentID" })
    }

    if (/\s/.test(password)) {
      return res.status(400).json({ msg: "Password should not contain spaces" });
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Check if password meets minimum length (example: 6 characters)
    if (password.length < 8) {
      return res.status(400).json({ msg: "Password should be at least 8 characters long" });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { enrollmentID }],
    });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    console.log("Hello");

    // Get Cloudinary image URL
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ msg: "Image is required to be uploaded" });
    }

    // Generate QR code (example)
    const qrData = await QRcode(enrollmentID);

    // Save user to database
    const user = await User.create({
      name,
      email,
      password,
      enrollmentID,
      img: imageUrl,
      qrCode: qrData,
    });

    console.log(JWT_SECRET);


    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, _id: user._id, enrollmentID: user.enrollmentID, role: 'student' },
      JWT_SECRET
    );

    user.token = token;
    await user.save();

    console.log("Came Here");

    // Send email to the user
    const emailSubject = "ID Created Successfully";
    const emailBody = `
            Welcome ${name}, 

            Your account has been successfully created with the following details:
            - Email: ${email}
            - Enrollment ID: ${enrollmentID}

            Thank you for joining CampusMate!
        `;

    const mail = await SendMail(email, emailSubject, emailBody);
    if (!mail) {
      res.status(500).json({ msg: "Email Couldnt be Sent" });
    }

    // Set cookie and respond
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Send cookie over HTTPS only
      sameSite: "none",
      maxAge: 3600000
    });
    res.status(200).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ msg: "Registration failed. Try again later." });
  }
};

const login = async (req, res) => {
  try {
    console.log("Received login request:", req.body);

    const { enrollmentID, password } = req.body;
    console.log(enrollmentID, password);

    for (const key in req.body) {
      if (!req.body[key] || req.body[key].trim() === "") {
        console.log(`Field ${key} is missing or empty`);
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }

    const user = await User.findOne({ enrollmentID });
    if (!user) {
      console.log("User not found with the provided enrollmentID");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      console.log("Password Does not match");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }
    console.log(matched);

    const token = user.token;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Send cookie over HTTPS only
      sameSite: "none",
      maxAge: 3600000
    });
    console.log("Generated Token :", token);

    console.log("Login successful, returning token");
    return res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ msg: "An error occurred during login" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;

    const schemaFields = Object.keys(User.schema.paths);

    for (const key in update) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          msg: `Unknown field: ${key}`,
        });
      }
      if (!update[key] || update[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const updateData = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res.status(404).json({
        status: 404,
        msg: "User not found",
      });
    }

    res.json({
      status: 200,
      msg: "User updated successfully",
      updateData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: 500,
      msg: "An error occurred while updating the user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await User.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "User deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const showData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error("Error in showData:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const isBooked = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const enrollmentID = user.enrollmentID;
    console.log(enrollmentID);
    const registerStatus = await Reservation.findOne({
      enrollmentNumber: enrollmentID,
    });
    let isRoomBooked = false;
    if (registerStatus) {
      isRoomBooked = true;
    }
    console.log(isRoomBooked);

    res.json({ isRoomBooked, user: user.name }); // Send booking status and user info
  } catch (err) {
    console.error("Error in isBooked:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const gatePassList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "User not found" });

    const rollNumber = user.enrollmentID;
    const gatePasses = await GatePass.find({ enrollmentId: rollNumber });

    res.status(200).json(gatePasses);
  } catch (error) {
    console.error("Error fetching gate passes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const complaintList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "User not found" });

    const rollNumber = user.enrollmentID;
    const complaints = await Complaint.find({ enrollmentId: rollNumber });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching gate passes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showMenu = async (req, res) => {
  const token = req.cookies.token;

  const user = await User.findOne({ token });
  // console.log(user);

  const enrollmentId = user.enrollmentID;
  // console.log(enrollmentId);

  const userBooking = await Reservation.findOne({
    enrollmentNumber: enrollmentId,
  });
  if (!userBooking) {
    return res.status(404).json({ msg: "Please Book the room first" });
  }
  const hostel = userBooking.hostelname;
  console.log(hostel);

  const warden = await Admin.findOne({ hostel });

  // console.log(warden);

  const imgUrl = warden.messMenu;
  const desc = warden.messDesc;

  return res.status(200).json({
    success: true,
    msg: "Mess menu updated successfully",
    imageUrl: imgUrl,
    description: desc,
  });
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  showData,
  isBooked,
  gatePassList,
  complaintList,
  showMenu,
};
