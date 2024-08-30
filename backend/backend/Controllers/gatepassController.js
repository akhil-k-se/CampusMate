const express = require('express');
const app = express();
const gatepass = require('../models/gatepassModel');
const reservation = require('../models/reservationModel');


const createGatepass = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data', inputData);

        if (!inputData.outday) {
            return res.status(403).send('Please Select Out Day Time');
        }

        if (!inputData.reason || !inputData.outtime || !inputData.intime || !inputData.outdate) {
            return res.status(400).send('Must fill all fields');
        }

        if (inputData.outday === 'Night Out' && !inputData.indate) {
            return res.status(400).send('Must fill indate for Night Out');
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        
        if (!studentReservation) {
            return res.status(404).send('No reservation found');
        }

        const newGatePass = new gatepass({
            ...inputData,
            studentId: studentReservation._id
        });
        
        const data = await newGatePass.save();
        console.log('data', data);

        return res.status(201).send('GatePass created successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error creating Gatepass');
    }
};

const getGatepasses = async (req, res) => {
    try {
        const gatepasses = await gatepass.find().populate('studentId');
        return res.status(200).json({
            message: 'Gatepasses retrieved successfully',
            data: gatepasses
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error retrieving gatepasses');
    }
};

module.exports = {
    createGatepass,
    getGatepasses
};
