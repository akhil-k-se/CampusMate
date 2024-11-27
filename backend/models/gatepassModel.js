const mongoose = require('mongoose');
const GatepassSchema = new mongoose.Schema({
    hostel:{
        type:String
    },
    outday: {
        type: String,
        enum: ['Day Out', 'Night Out'],
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    outtime: {
        type: String,
        required: true
    },
    intime: {
        type: String,
        required: true,   
    },
    outdate: {
        type: Date,
        required: true
    },
    indate: {
        type: Date,
        required: function() {
            return this.outday === 'Night Out';
        }
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation',
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gatepass', GatepassSchema);
