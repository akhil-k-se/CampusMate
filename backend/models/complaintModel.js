const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    issuetype: {
        type: String,
        enum: ['Room Maintenance', 'Cleanliness and Hygiene', 'Food and Dining', 'Safety and Security', 'Facilities and Amenities', 'Hostel Administration', 'Other'],
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('complaint', complaintSchema);
