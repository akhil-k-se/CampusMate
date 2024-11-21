const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true
    },
    enrollmentID: {
        type: String, 
        required: true,
        unique: true
    },
    avatar: {
        public_id: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    qrCode: {
        type: String,
        required: true
    },
    messEntry:{
        type:String,
        enum:['IN','OUT'],
        default:'OUT'
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
