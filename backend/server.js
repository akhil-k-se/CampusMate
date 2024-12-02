require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');







const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));


const checkSecurity = require("./middlewares/checkSecurity").checkSecurity;

const gateSecurity = require("./routes/gateSecurity");

const admin = require("./models/adminModel");
const reservation = require("./models/gatepassModel");

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
app.use("/gateSecurity",gateSecurity);
app.post('/qrscanner', qrScan.processQR);

messScheduler();


app.post('/getTokenForSecurity', (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log("Received Token:",token);
    if (token) {
        res.cookie("token", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
        });
        console.log(token);

     
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
app.get("/qr-scan/:enrollmentID", checkSecurity, async (req, res) => {
    try {
        const { enrollmentID } = req.params;
        const role = req.securityRole;
        const user = await student.findOne({ enrollmentID });

        if (!user) {
            return res.status(404).json({ msg: "Student not found" });
        }

        if (role == "MessSecurity") {
            user.messEntry = user.messEntry === "OUT" ? "IN" : "OUT";
            await user.save();
            return res.json({ entryType: "MessEntry", status: user.messEntry });
        } else if (role == "GateSecurity") {
            const gatePasses = await reservation
                .find({ enrollmentId: enrollmentID })
                .sort({ createdAt: -1 });

            if (!gatePasses || gatePasses.length === 0) {
                return res.status(404).json({ msg: "No gatepass found for the student" });
            }

            const latestGatePass = gatePasses[0];

            if (latestGatePass.status != "Approved") {
                return res.status(403).json({ gatePass:latestGatePass,msg: "Cannot update entry for unApproved gatepass" });
            }

            user.gateEntry = user.gateEntry === "IN" ? "OUT" : "OUT" ? "IN-OUT" :"IN-OUT";
            await user.save();
            return res.json({ entryType: "GateEntry",GatePass:latestGatePass, status: user.gateEntry });

            // if (user.gateEntry == "IN") {
            //     user.gateEntry = "OUT";
            //     await user.save();
            //     return res.json({ 
            //         entryType: "GateEntry", 
            //         status: user.gateEntry, 
            //         gatePass: latestGatePass,
            //         gatePassStatus: latestGatePass.status 
            //     });
            // } else {
            //     return res.status(403).json({ msg: "Gate entry status is not 'IN', cannot update" });
            // }
        } else {
            return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
        }
    } catch (error) {
        console.error("Error updating entry status:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});



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
