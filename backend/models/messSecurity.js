const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const messSecuritySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, default: "MessSecurity" },
  createdAt: { type: Date, default: Date.now },
});

const MessSecurity = mongoose.model("MessSecurity", messSecuritySchema);

module.exports = MessSecurity;
