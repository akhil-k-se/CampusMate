const mongoose = require("mongoose");

const messSecuritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z\s]+$/, 'Can only contain alphabets and spaces']
  },
  email:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "MessSecurity"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  jwtToken: {
    type: String,
    default: null
  },
});

const MessSecurity = mongoose.model("MessSecurity", messSecuritySchema);

module.exports = MessSecurity;
