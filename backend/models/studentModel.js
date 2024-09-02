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
    enrollmentID : {
        type: Number, 
        required: true,
        unique: true
        },
    avatar : {
        public_id : {
            type : String,
            default : ''
        },
        url : {
            type : String,
            default : ''
        }
    }
},{timestamps:true});

module.exports = mongoose.model('Student', studentSchema);
