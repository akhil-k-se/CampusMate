const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reserve = require('../models/reservationModel'); 
const Admin = require('../models/adminModel');
const User = require("../models/studentModel");

// const sms = require("../helpers/smsService");

app.use(bodyParser.json());

const reservation = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data',inputData)

        const token =  req.cookies.token;
        console.log("the token is ",token);

        const user = await User.findOne({token});
        console.log("The user is ",user);

        if(inputData.enrollmentNumber != user.enrollmentID || inputData.email!= user.email)
        { 
            return res.status(400).send({ message: 'Fill your Own Credentials' });
        }
        
        if (!inputData.firstName || !inputData.email || !inputData.enrollmentNumber || !inputData.gender || !inputData.phone || !inputData.address || !inputData.city || !inputData.state || !inputData.country || !inputData.roomtype || !inputData.hostelname || !inputData.roomseater || !inputData.roomfloor || !inputData.parentname || !inputData.parentphone || !inputData.parentEmail) {
            return res.status(400).send({ message: 'Must fill all fields' });
        }
        if(inputData.firstName.length <2)
        {
            return res.status(400).json({ message: 'First name must be at least 2 characters long' });
        }
        if(inputData.lastName.length < 2)
        {
            return res.status(400).json({ message: 'Last name must be at least 2 characters long' });
        }
        if (!/^\S+@\S+\.\S+$/.test(inputData.email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        if (inputData.enrollmentNumber.length < 10) {
            return res.status(400).json({ message: 'Enrollment number must be at least 5 characters long' });
        }
        if (!/^\d{10}$/.test(inputData.phone)) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }

        checkEmail = await reserve.findOne({ 'email': inputData.email });
        checkRoll = await reserve.findOne({ 'enrollmentNumber': inputData.enrollmentNumber });
        checkPhone = await reserve.findOne({ 'phone': inputData.phone });
        checkParentphone = await reserve.findOne({ 'parentphone': inputData.parentphone });
        
        if(checkEmail)
        {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        if(checkRoll)
        {
            return res.status(400).json({ message: 'Enrollment number is already in use' });
        }
        if(checkPhone)
        {
            return res.status(400).json({ message: 'Phone number is already in use' });
        }
        if(checkParentphone)
        {
            return res.status(400).json({ message: 'Parent phone number is already in use' });
        }

        const newReservation = new reserve(inputData);
        const data = await newReservation.save();

        // await sms(`Your Bed is Booked Seccessfully ${inputData}`);

        console.log('data', data)
        
        return res.status(201).send({ message: 'Booking created successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error creating booking'});
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
