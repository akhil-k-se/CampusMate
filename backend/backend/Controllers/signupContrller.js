const bcrypt = require('bcrypt');
const Student = require('../models/studentModel');
const Admin = require('../models/adminModel');
const Administrator = require('../models/administratorModel');

const registerUser = async (Model, req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Model({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.registerStudent = (req, res) => registerUser(Student, req, res);
exports.registerAdmin = (req, res) => registerUser(Admin, req, res);
exports.registerAdministrator = (req, res) => registerUser(Administrator, req, res);
