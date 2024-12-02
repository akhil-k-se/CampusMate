const express = require('express');
const app = express();
const gatepass = require('../models/gatepassModel');
const reservation = require('../models/reservationModel');
const User = require("../models/studentModel");

const createGatepass = async (req, res) => {
    try {
        const token = req.cookies.token;
        const inputData = req.body;
        console.log('Input Data', inputData);

        const user = await User.findOne({token});

        if(inputData.enrollmentNumber!= user.enrollmentID)
        {
            return res.status(400).send({ message: 'Fill Your Roll Own Roll Number' });
        }

        if (!inputData.outday) {
            return res.status(403).send({ message: 'Please Select Out Day Time' });
        }

        if (!inputData.reason || !inputData.outtime || !inputData.intime || !inputData.outdate) {
            return res.status(400).send({ message: 'Must fill all fields' });
        }

        if (inputData.outday === 'Night Out' && !inputData.indate) {
            return res.status(400).send({ message: 'Must fill indate for Night Out' });
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        
        if (!studentReservation) {
            return res.status(404).send({ message: 'No reservation found' });
        }
        

        const newGatePass = new gatepass({
            ...inputData,
            enrollmentId:inputData.enrollmentNumber,
            studentId: studentReservation._id
        });


        newGatePass.hostel=studentReservation.hostelname;
        
        const data = await newGatePass.save();
        console.log('data', data);

        return res.status(201).send({ message: 'GatePass created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating Gatepass' });
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
const updateGatepassStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;

        if (!_id || !status) {
            return res.status(400).json({ message: 'Missing gatepass ID or status' });
        }
        const gatepasses = await gatepass.findById(_id);

        if (!gatepasses) {
            return res.status(404).json({ message: 'Gatepass not found' });
        }
        gatepasses.status = status;
        const updatedGatepass = await gatepasses.save();
        res.json(updatedGatepass);
    } catch (error) {
        console.error('Error updating gatepass status:', error);
        res.status(500).json({ message: 'Error updating gatepass status', error: error.message });
    }
};

const checkGatePass = async (req, res) => {
    try {
        console.log("Hello");
        const { enrollmentNumber, date } = req.body;

        if (!enrollmentNumber || !date) {
            return res.status(400).json({ message: "Enrollment number and date are required" });
        }

        console.log("The things are ", enrollmentNumber, " ", date);

        const existingGatePasses = await gatepass.find({
            enrollmentId: enrollmentNumber,
        });

        console.log("The Array is ", existingGatePasses);

        if (existingGatePasses.length > 0) {
            const currentDate = new Date();

            const hasActiveGatePass = existingGatePasses.some((gatepass) => {
                const gatePassDate = new Date(gatepass.outdate); 
                const gatePassInDate = gatepass.indate ? new Date(gatepass.indate) : null;

                if (gatepass.outday === "Day Out") {
                    return !(
                        gatepass.gateEntry === "IN-OUT" || 
                        gatepass.status === "Rejected" || currentDate>gatePassDate
                    );
                }

                if (gatepass.type === "Night Out") {
                    
                    return !(
                        (gatepass.gateEntry === "IN-OUT" || 
                         gatepass.status === "Rejected")
                    );
                }

                return false;
            });

            if (hasActiveGatePass) {
                return res.json({
                    exists: true,
                    message: "You can Apply only One GatePass at a Time.",
                });
            }
        }

        return res.json({
            exists: false,
            message: "No active or incomplete gatepass found. User can apply.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while checking the gatepass.",
        });
    }
};




module.exports = {
    createGatepass,
    getGatepasses,
    updateGatepassStatus,
    checkGatePass
};