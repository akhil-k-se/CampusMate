const mongoose = require("mongoose");

const gateSecuritySchema = new mongoose.Schema({
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
    default: "GateSecurity"
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

const GateSecurity = mongoose.model("GateSecurity", gateSecuritySchema);

module.exports = GateSecurity;