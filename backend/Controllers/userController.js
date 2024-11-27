const User = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123"
const bcrypt = require("bcrypt");
const QRcode = require("../helpers/qrCodeGenerator");
const Reservation = require("../models/reservationModel");
const GatePass = require("../models/gatepassModel");
const Complaint = require('../models/complaintModel')
// const { sendGreetMail } = require("../helper/mailServices");
const register = async (req, res) => {
    try {
        const { name, enrollmentID, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { enrollmentID }]
        });

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                msg: "User already exists with this email or enrollment ID",
            });
        }

        // Generate QR code
        const qrData = await QRcode(enrollmentID);

        // Create user
        console.log("The Pssword is :", password);
        const user = await User.create({
            name,
            enrollmentID,
            email,
            password,
            qrCode: qrData,
        });

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, _id: user._id,enrollmentID: user.enrollmentID },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Save token in the database (optional)
        user.token = token; // Assuming your User model has a `token` field
        await user.save();

        // Set token in HTTP-only cookie
        await res.cookie("token", token, {
            httpOnly: true,  // Make cookie accessible only through HTTP requests, not JavaScript
            secure: false, // Secure flag: only for HTTPS in production
            maxAge: 60 * 60 * 1000, // Cookie expiration time (1 hour here)
        });

        console.log("The token in cookie is", req.cookies.token);

        console.log("User registered successfully:", user);

        return res.status(200).send(`
            <html>
              <body>
                <h1>Registration Successful</h1>
                <h2>Generated QR Code</h2>
                <img src="${qrData}" alt="QR Code" />
              </body>
            </html>
          `);
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({
            msg: "Please check the details you have entered or try again later",
        });
    }
};

const login = async (req, res) => {
    try {
        console.log('Received login request:', req.body);

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

        const matched = bcrypt.compare(password, user.password);
        if (!matched) {
            console.log("Password Does not match");
            return res.status(401).json({ msg: "Incorrect credentials" });
        }

        const token = user.token;

        res.cookie("token", token, { httpOnly: true });
        console.log("Generated Token:", token);

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

        // Get the schema paths (field names)
        const schemaFields = Object.keys(User.schema.paths);

        // Check for any unknown fields
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
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        console.error('Error in showData:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const isBooked = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const enrollmentID = user.enrollmentID;
        console.log(enrollmentID);
        const registerStatus = await Reservation.findOne({ enrollmentNumber: enrollmentID });
        let isRoomBooked = false;
        if (registerStatus) {
            isRoomBooked = true;
        }
        console.log(isRoomBooked);

        res.json({ isRoomBooked, user: user.name }); // Send booking status and user info
    } catch (err) {
        console.error('Error in isBooked:', err);
        res.status(500).json({ error: 'Internal server error' });
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


module.exports = { register, login, updateUser, deleteUser, showData, isBooked, gatePassList, complaintList };