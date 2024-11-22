const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const messSecuritySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "MessSecurity" },
  createdAt: { type: Date, default: Date.now },
  jwtToken: { type: String, default: null },
});

const MessSecurity = mongoose.model("MessSecurity", messSecuritySchema);

module.exports = MessSecurity;
