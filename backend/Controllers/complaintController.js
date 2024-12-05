const express = require('express');
const complaint = require('../models/complaintModel');
const reservation = require('../models/reservationModel');
const Admin = require('../models/adminModel');
const User = require("../models/studentModel");
const SendMail = require('../helpers/smsService');

const createComplaint = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No token");
            return res.status(401).send({ message: "User not authenticated" });
        }

        const inputData = req.body;
        console.log('Input Data:', inputData);

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        console.log("User Roll Number:", user.enrollmentID);

        if (inputData.enrollmentNumber != user.enrollmentID) {
            console.log("Not your Roll Number");
            return res.status(400).send({ message: "Fill Your Own Roll Number" });
        }

        if (!inputData.issuetype || !inputData.issue || !inputData.description) {
            return res.status(400).send({ message: "Must fill all necessary details" });
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        if (!studentReservation) {
            console.log("No reservation");
            return res.status(404).send({ message: "No reservation found in the database" });
        }

        const hostelName = studentReservation.hostelname;
        console.log("Hostel Name:", hostelName);

        const newComplaint = new complaint({
            ...inputData,
            studentId: studentReservation._id,
            enrollmentId: inputData.enrollmentNumber,
            hostel: hostelName,
        });

        const data = await newComplaint.save();
        console.log('Complaint Data:', data);

        const emailSubject = "Complaint Submitted Successfully";
        const emailBody = `
            Dear ${user.name},

            Your complaint has been successfully submitted. Below are the details of your complaint:

            - Enrollment Number: ${inputData.enrollmentNumber}
            - Hostel Name: ${hostelName}
            - Issue Type: ${inputData.issuetype}
            - Issue: ${inputData.issue}
            - Description: ${inputData.description}

            We will review your complaint and take the necessary actions as soon as possible. 

            Thank you for bringing this to our attention.

            Best regards,  
            CampusMate Support Team
        `;

        const mail = await SendMail(user.email, emailSubject, emailBody);

        if (!mail) {
            return res.status(500).json({ message: "Complaint registered, but email could not be sent." });
        }

        return res.status(201).send({ message: "Complaint successfully registered and email sent" });
    } catch (err) {
        console.error("Error registering complaint:", err);
        return res.status(500).send({ message: "Error registering complaint" });
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