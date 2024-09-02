const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookie = require('cookie-parser')

const app = express();

const reserve = require('./Controllers/reservationController');
const gate = require('./Controllers/gatepassController');
const gatepass = require('./models/gatepassModel');
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')


app.use(cors());
app.use(express.json());

const Dbconnect = require('./middlewares/Db');
const cookieParser = require('cookie-parser');
Dbconnect();

app.use(cookieParser())

app.use('/student', userRoutes)
app.use('/admin', adminRoutes)


//Booking Routes
app.post('/reservation',reserve.reservation);
app.get('/reservationlist',reserve.getreservation);

//GatePass Routes
app.post('/gatepass',gate.createGatepass)
app.get('/gatepasseslist', async (req, res) => {
    try {
        const gatepasses = await gatepass.find().populate('studentId');
        res.json(gatepasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch('/gatepass/status', gate.updateGatepassStatus);

//Complaints Routes
app.post('/usercomplaints',complaint.createComplaint);

app.listen(3005, () => {
    console.log('Server started on 3005');
});

