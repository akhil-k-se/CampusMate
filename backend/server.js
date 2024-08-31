const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const reserve = require('./Controllers/reservationController');
const gate = require('./Controllers/gatepassController');
const gatepass = require('./models/gatepassModel');
const userRoutes = require('./routes/userRoutes')


app.use(cors());
app.use(express.json());

const Dbconnect = require('./middlewares/Db');
Dbconnect();

app.use('/student', userRoutes)


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

app.listen(3005, () => {
    console.log('Server started on 3005');
});

