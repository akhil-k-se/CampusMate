const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const { registerStudent, registerAdmin, registerAdministrator} = require ('./Controllers/signupContrller');
const {loginStudent, loginAdmin, loginAdministrator } = require('./Controllers/loginController');
const reserve = require('./Controllers/reservationController');
const gate = require('./Controllers/gatepassController');
const gatepass = require('./models/gatepassModel');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

const Dbconnect = require('./middlewares/Db');
Dbconnect();

// Registration Routes
app.post('/register/student', registerStudent);
app.post('/register/admin', registerAdmin);
app.post('/register/administrator', registerAdministrator);

// Login Routes
app.post('/login/student', loginStudent);
app.post('/login/admin', loginAdmin);
app.post('/login/administrator', loginAdministrator);

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

