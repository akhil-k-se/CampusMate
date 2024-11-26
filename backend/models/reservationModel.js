const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, },
    email: { type: String, required: true, unique: true, },
    enrollmentNumber: { type: String, required: true, unique: true, index: true },
    gender: { type: String, required: true, enum: ['Female', 'Male'],},
    phone: { type: String, required: true, unique:true, },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    parentname: {type:String, required:true},
    parentphone: { type: String, required: true, unique:true},
    parentEmail : {type:String},
    roomtype: {type: String,required:true, enum: ['Attach Bathroom Non AC', 'Common Bathroom Non AC', 'Attach Bathroom With AC', 'Common Bathroom With AC'],},
    hostelname: {type:String, required:true},
    roomseater: {type: String, required: true, enum: ['1', '2', '3', '4'],},
    roomfloor: {type: String, required: true, enum: ['1', '2', '3', '4','5','6','7','8'],},
}, { timestamps: true });

module.exports = mongoose.model('reservation', reservationSchema);