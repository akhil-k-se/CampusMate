const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reserve = require('../models/reservationModel'); 

app.use(bodyParser.json());

const reservation = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data',inputData)
        
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
        console.log('data', data)
        
        return res.status(201).send({ message: 'Booking created successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error creating booking'});
    }
};

const getreservation = async (req, res) => {
    try {
        const reservations = await reserve.find();
        return res.status(200).json({
            message: 'Bookings retrieved successfully',
            data: reservations
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving bookings' });
    }
};

module.exports = {
    reservation,
    getreservation,
};
