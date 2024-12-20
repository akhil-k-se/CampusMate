const express = require('express');
const app = express();
const gatepass = require('../models/gatepassModel');
const reservation = require('../models/reservationModel');
const User = require("../models/studentModel");
const SendMail = require("../helpers/mailService");

const createGatepass = async (req, res) => {
    try {
        const token = req.cookies.token;
        const inputData = req.body;
        console.log('Input Data', inputData);

        const user = await User.findOne({ token });

        if (inputData.enrollmentNumber != user.enrollmentID) {
            return res.status(400).send({ message: 'Fill Your Own Roll Number' });
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
            enrollmentId: inputData.enrollmentNumber,
            studentId: studentReservation._id,
            hostel: studentReservation.hostelname,
        });

        user.gateEntry = "IN";
        await user.save();

        const data = await newGatePass.save();

        console.log('Gate Pass Data:', data);

        // Prepare email content
        const emailSubject = "Gate Pass Applied";
        const emailBody = `
            Dear ${user.name},

            Your gate pass has been successfull applied.

            Details of the Gate Pass:
            - Enrollment Number: ${inputData.enrollmentNumber}
            - Reason: ${inputData.reason}
            - Out Day: ${inputData.outday}
            - Out Date: ${inputData.outdate}
            - Out Time: ${inputData.outtime}
            - In Time: ${inputData.intime}
            ${inputData.outday == 'Night Out' ? `- In Date: ${inputData.indate}` : ''}
            - Hostel: ${studentReservation.hostelname}

            Please ensure you follow the rules while outside the campus. 

            Thank you,
            CampusMate Team
        `;

        // Send Email
        const mail = await SendMail(user.email, emailSubject, emailBody);

        if (!mail) {
            return res.status(500).json({ message: 'Gate pass created, but email could not be sent.' });
        }

        return res.status(201).send({ message: 'GatePass created and email sent successfully', data });

    } catch (err) {
        console.error("Error creating Gatepass:", err);
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
        console.log(status);

        if (!_id || !status) {
            return res.status(400).json({ message: 'Missing gatepass ID or status' });
        }

        const gatepassRecord = await gatepass.findById(_id);
        console.log(gatepassRecord);

        if (!gatepassRecord) {
            return res.status(404).json({ message: 'Gatepass not found' });
        }

        // Update the gatepass status
        gatepassRecord.status = status;
        const updatedGatepass = await gatepassRecord.save();

        // Get the user associated with this gatepass (assuming you have a reference to the user)
        const student = await User.findOne({enrollmentID:gatepassRecord.enrollmentId});
        
        if (!student) {
            return res.status(404).json({ message: 'User not found for this gatepass' });
        }

        console.log("Hello");

        // Prepare the email content
        let emailSubject = `Gatepass ${status == 'Approved' ? 'Approved' : 'Rejected'}`;
        let emailBody = `
            Dear ${student.name},

            Your gatepass request has been ${status == 'Approved' ? 'Approved' : 'Rejected'}.

            - EnrollmentID: ${student.enrollmentID}
            - Status: ${status == 'Approved' ? 'Approved' : 'Rejected'}
            - Type : ${gatepassRecord.outday}
            - Out Day : ${gatepassRecord.outdate}
            - Out Time: ${gatepassRecord.outtime}
            - In Day : ${gatepassRecord.indate}
            - In Time: ${gatepassRecord.intime}
            - Reason: ${gatepassRecord.reason}

            Please contact the hostel office if you have any questions regarding this decision.

            Best regards,
            CampusMate Support Team
        `;

        // Send the email to the user
        const mail = await SendMail(student.email, emailSubject, emailBody);

        if (!mail) {
            return res.status(500).json({ message: "Gatepass status updated, but email could not be sent." });
        }

        // Return the updated gatepass
        console.log(updatedGatepass);
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

        const user = await User.findOne({enrollmentID:enrollmentNumber})

        console.log("The Array is ", existingGatePasses);

        if (existingGatePasses.length > 0) {
            const currentDate = new Date();

            const hasActiveGatePass = existingGatePasses.some((gatepass) => {
                const gatePassDate = new Date(gatepass.outdate);
                // console.log(currentDate>gatePassDate);
                const gatePassInDate = gatepass.indate ? new Date(gatepass.indate) : null;
                console.log(gatePassDate<currentDate);

                if (gatepass.outday === "Day Out") {
                    return !(
                        user.gateEntry === "IN-OUT" || 
                        gatepass.status === "Rejected" || currentDate>gatePassDate
                    );
                }

                if (gatepass.outday === "Night Out") {
                    
                    return !(
                        (user.gateEntry === "IN-OUT" || 
                         gatepass.status === "Rejected") ||  currentDate>gatePassInDate
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