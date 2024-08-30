const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reserve = require('../models/reservationModel'); 

app.use(bodyParser.json());

const reservation = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data',inputData)
        
        if (!inputData.firstName || !inputData.lastName || !inputData.email || !inputData.enrollmentNumber || !inputData.gender || !inputData.phone || !inputData.address || !inputData.city || !inputData.state || !inputData.country || !inputData.roomtype || !inputData.hostelname || !inputData.roomseater || !inputData.roomfloor || !inputData.parentname || !inputData.parentphone || !inputData.parentEmail) {
            return res.status(400).send('Must fill all fields');
        }
        
        const newReservation = new reserve(inputData);
        const data = await newReservation.save();
        console.log('data', data)
        
        return res.status(201).send('Booking created successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error creating booking');
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
        return res.status(500).send('Error retrieving bookings');
    }
};

module.exports = {
    reservation,
    getreservation,
};
