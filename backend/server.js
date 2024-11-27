require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');







const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // This allows cookies to be sent
}));


const mess = require("./Controllers/messController").verifyMessSecurity;

const admin = require("./models/adminModel");

const complaint = require('./Controllers/complaintController')
const reserve = require('./Controllers/reservationController')
const gate = require('./Controllers/gatepassController');
const gatepass = require('./models/gatepassModel');
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const messRoutes = require("./routes/messSecurity")

const getQRcode = require("./helpers/qrCodeGetter");

const student = require('./models/studentModel');

const qrScan = require('./routes/qr')

const messScheduler = require("./helpers/messScheduler");
// const session = require('express-session');


app.use(express.json());

const Dbconnect = require('./middlewares/Db');
Dbconnect();


app.use('/student', userRoutes)
app.use('/admin', adminRoutes)
app.use('/mess', messRoutes);
app.post('/qrscanner', qrScan.processQR);

messScheduler();


app.post('/getTokenForSecurity', (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log("Received Token:",token);
    if (token) {
        res.cookie("token", token, {
            httpOnly: true,  // Make cookie accessible only through HTTP requests, not JavaScript
            secure: process.env.NODE_ENV === "production", // Secure flag: only for HTTPS in production
            maxAge: 60 * 60 * 1000, // Cookie expiration time (1 hour here)
        });
        console.log(token);

        // Send a response back to the client
        return res.status(200).json({ msg: "Token stored in cookie" });
    } else {
        return res.status(400).json({ msg: "No token provided in Authorization header" });
    }
});


// app.use(session({
//     secret: '1234',
//     resave: false,
//     saveUninitialized: true,
//   }));

app.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).send({ message: 'Logged out successfully' });
});




app.get('/get-qrcode/:enrollmentID', getQRcode)
app.get("/qr-scan/:enrollmentID", mess, async (req, res) => {
    const { enrollmentID } = req.params;
    const user = await student.findOne({ enrollmentID });
    user.messEntry = user.messEntry === "OUT" ? "IN" : "OUT";
    user.save();
    return res.json(user.messEntry);
})

app.get("/no-reload", (req, res) => {
    res.render("No Reload ALlowed");
})

//Booking Routes
app.post('/reservation', reserve.reservation);
app.get('/reservationlist', reserve.getreservation);

//GatePass Routes
app.post('/gatepass', gate.createGatepass)
app.get('/gatepasseslist', async (req, res) => {
    try {
        const token =req.cookies.token;
        // console.log(token);
        const Admin = await admin.findOne({token});
        // console.log(Admin.hostel);
        const hostelName = Admin.hostel;
        console.log(hostelName);
        const gatepasses = await gatepass.find({hostel:hostelName}).populate('studentId');
        res.json(gatepasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch('/gatepass/status', gate.updateGatepassStatus);

//Complaints Routes
app.post('/usercomplaints', complaint.createComplaint);
app.get('/complaintList',complaint.complaintList)

app.listen(3005,() => {
    console.log('Server started on 3005');
});
