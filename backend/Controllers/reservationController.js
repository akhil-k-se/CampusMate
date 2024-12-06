const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reserve = require('../models/reservationModel'); 
const Admin = require('../models/adminModel');
const User = require("../models/studentModel");
const SendMail = require('../helpers/mailService');

// const sms = require("../helpers/smsService");

app.use(bodyParser.json());

const reservation = async (req, res) => {
    try {
        const inputData = req.body;
        console.log("Input Data", inputData);

        const token = req.cookies.token;
        console.log("The token is", token);

        const user = await User.findOne({ token });
        console.log("The user is", user);

        if (inputData.enrollmentNumber != user.enrollmentID || inputData.email != user.email) {
            return res.status(400).send({ message: "Please fill in your own credentials" });
        }

        const requiredFields = [
            "firstName", "email", "enrollmentNumber", "gender", "phone", 
            "address", "city", "state", "country", "roomtype", 
            "hostelname", "roomseater", "roomfloor", "parentname", 
            "parentphone", "parentEmail"
        ];
        for (const field of requiredFields) {
            if (!inputData[field]) {
                return res.status(400).send({ message: `Field ${field} is required` });
            }
        }

        if (inputData.firstName.length < 2) {
            return res.status(400).json({ message: "First name must be at least 2 characters long" });
        }
        if (inputData.lastName && inputData.lastName.length < 2) {
            return res.status(400).json({ message: "Last name must be at least 2 characters long" });
        }
        if (!/^\S+@\S+\.\S+$/.test(inputData.email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        if (inputData.enrollmentNumber.length < 10) {
            return res.status(400).json({ message: "Enrollment number must be at least 10 characters long" });
        }
        if (!/^\d{10}$/.test(inputData.phone)) {
            return res.status(400).json({ message: "Phone number must be 10 digits" });
        }


        const duplicates = await Promise.all([
            reserve.findOne({ email: inputData.email }),
            reserve.findOne({ enrollmentNumber: inputData.enrollmentNumber }),
            reserve.findOne({ phone: inputData.phone }),
            reserve.findOne({ parentphone: inputData.parentphone })
        ]);

        if (duplicates[0]) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        if (duplicates[1]) {
            return res.status(400).json({ message: "Enrollment number is already in use" });
        }
        if (duplicates[2]) {
            return res.status(400).json({ message: "Phone number is already in use" });
        }
        if (duplicates[3]) {
            return res.status(400).json({ message: "Parent's phone number is already in use" });
        }

        const newReservation = new reserve(inputData);
        const data = await newReservation.save();

        const emailSubject = "Reservation Confirmation - Hostel Booking";
        const emailBody = `
            Dear ${inputData.firstName},

            Congratulations! Your hostel booking has been successfully confirmed.

            Here are the details:
            - Name: ${inputData.firstName} ${inputData.lastName || ""}
            - Email: ${inputData.email}
            - Enrollment ID: ${inputData.enrollmentNumber}
            - Hostel Name: ${inputData.hostelname}
            - Room Type: ${inputData.roomtype}
            - Room Seater: ${inputData.roomseater}
            - Floor: ${inputData.roomfloor}

            If you have any questions, feel free to contact us.

            Best Regards,  
            CampusMate Team
        `;

        const mail = await SendMail(inputData.email, emailSubject, emailBody);

        if (!mail) {
            return res.status(500).json({ message: "Email couldn't be sent" });
        }

        console.log("Booking data saved:", data);

        return res.status(201).send({ message: "Booking created successfully", data });

    } catch (err) {
        console.error("Error creating booking:", err);
        return res.status(500).send({ message: "Error creating booking" });
    }
};


const getreservation = async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;
        console.log(token);

        // Find the admin by token
        const admin = await Admin.findOne({ token });
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        console.log(admin);

        // Get the hostel name from the admin's details
        const hostelName = admin.hostel;

        // Find reservations for the given hostel
        const reservations = await reserve.find({ hostelname: hostelName });
        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found" });
        }

        // Fetch user images for each reservation
        const reservationData = await Promise.all(
            reservations.map(async (reservation) => {
                const user = await User.findOne({ enrollmentID: reservation.enrollmentNumber });
                console.log(user);

                return {
                    ...reservation._doc, // Include all reservation data
                    userImg: user?.img || null, // Include user image if available
                };
            })
        );

        // Send the response with reservation data and images
        return res.status(200).json({
            message: "Bookings retrieved successfully",
            data: reservationData,
        });
    } catch (err) {
        console.error("Error retrieving reservations:", err);
        return res.status(500).send({ message: "Error retrieving bookings" });
    }
};


const addbooking = async(req,res)=>{
    const inputData = req.body;
    if(!inputData.firstname)
    {
        return res.send({message: 'fill firstName'});
    }
}

module.exports = {
    reservation,
    getreservation,
    addbooking,
};
