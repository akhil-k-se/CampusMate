const express = require('express');
const complaint = require('../models/complaintModel');
const reservation = require('../models/reservationModel');
const Admin = require('../models/adminModel');
const User = require("../models/studentModel");

const createComplaint = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) console.log("No token");
        const inputData = req.body;
        console.log('Input Data', inputData);

        const user = await User.findOne({ token });
        console.log("the rollNo is ", user.enrollmentID);



        if (inputData.enrollmentNumber != user.enrollmentID) {
            console.log("Not your roll Number");
            return res.status(400).send({ message: 'Fill Your Roll Own Roll Number' });
        }

        if (!inputData.issuetype) {
            return res.status(403).send({ message: 'Please Select Issue' });
        }

        if (!inputData.issue) {
            return res.status(400).send({ message: 'Please Write the Issue.' });
        }

        if (!inputData.description) {
            return res.status(400).send({ message: 'Please explain the Issue.' });
        }
        if (!inputData.issue && !inputData.issue && !inputData.description) {
            return res.status(400).send({ message: 'Must fill the details' });
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        if (!studentReservation) {
            console.log("No reservation");
            return res.status(404).send({ message: 'No reservation found in the database.' });
        }

        const hostelName = studentReservation.hostelname;
        console.log("the token is ", token);



        const newComplaint = new complaint({
            ...inputData,
            studentId: studentReservation._id,
            enrollmentId: inputData.enrollmentNumber
        });

        newComplaint.hostel = hostelName;
        const data = await newComplaint.save();
        console.log('data', data);

        return res.status(201).send({ message: 'Complaint successfully registered' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering Complaint' });
    }
};

const complaintList = async (req, res) => {
    try {
        const token = req.cookies.token;
        const admin = await Admin.findOne({ token });
        const hostelName = admin.hostel;
        const Complaints = await complaint.find({ hostel: hostelName });
        res.json(Complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        console.log("Hello");

        const { _id, status } = req.body;
        console.log(status);


        if (!_id || !status) {
            return res.status(400).json({ message: 'Missing complaint ID or status' });
        }
        const complaints = await complaint.findById(_id);
        console.log(complaints);


        if (!complaints) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        complaints.status = status;
        const updatedComplaints = await complaints.save();
        console.log(updatedComplaints);

        res.json(updatedComplaints);
    } catch (error) {
        console.error('Error updating complaint status:', error);
        res.status(500).json({ message: 'Error updating complaint status', error: error.message });
    }
};


module.exports = {
    createComplaint,
    complaintList,
    updateComplaintStatus
};