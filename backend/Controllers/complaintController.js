const express = require('express');
const app = express();
const complaint = require('../models/complaintModel');
const reservation = require('../models/reservationModel');

const createComplaint = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data', inputData);

        if (!inputData.issuetype) {
            return res.status(403).send({ message: 'Please Select Issue' });
        }

        if (!inputData.issue) {
            return res.status(400).send({ message: 'Please Write the Issue.' });
        }

        if (!inputData.description) {
            return res.status(400).send({ message: 'Please explain the Issue.' });
        }
        if(!inputData.issue && !inputData.issue && !inputData.description)
        {
            return res.status(400).send({message: 'Must fill the details'});
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        
        if (!studentReservation) {
            return res.status(404).send({ message: 'No reservation found in the database.' });
        }

        const newComplaint = new complaint({
            ...inputData,
            studentId: studentReservation._id
        });
        const data = await newComplaint.save();
        console.log('data', data);

        return res.status(201).send({ message: 'Complaint successfully registered' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering Complaint' });
    }
};

module.exports = {
    createComplaint
};