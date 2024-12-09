const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Can only contain alphabets and spaces']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return emailRegex.test(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    hostel: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Can only contain alphabets and spaces']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    profilePic: {
        type: String,
        required: true
    },
    messMenu: {
        type: String,
    },
    messDesc: {
        type: String
    }
});

module.exports = mongoose.model('Admin', adminSchema);
