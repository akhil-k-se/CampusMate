const GateSecurity = require("../models/gateSecurityModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await GateSecurity.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email ,role:'gate-security'}, JWT_SECRET);

    const user = await GateSecurity.create({
      name,
      email,
      password: hashedPassword,
      jwtToken: token
    });

    res.json({ user: user, msg: "MessSecurity ID Created Sucessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "An error occurred while registering the user",
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await GateSecurity.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("hello");
      return res.status(401).json({ msg: "Invalid credentials" });
    }


    const token = user.jwtToken;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Send cookie over HTTPS only
      sameSite: "none",
    });

    res.json({ mssg: "MessSecurity Logged In Sucessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while logging in" });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const schemaFields = Object.keys(MessSecurity.schema.paths);

    for (const key in updates) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({ msg: `Unknown field: ${key}` });
      }
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }


    const updatedUser = await MessSecurity.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User updated successfully", updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while updating the user" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGuard = await GateSecurity.findByIdAndDelete(id);

    if (!deletedGuard) {
      return res.status(404).json({ success: false, msg: 'Guard not found.' });
    }

    res.json({ success: true, msg: 'Guard deleted successfully.' });
  } catch (error) {
    console.error('Error deleting guard:', error);
    res.status(500).json({ success: false, msg: 'An error occurred while deleting the guard.' });
  }
};


const verifyGateSecurity = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("The token is ", token);

  if (!token) {
    console.log("Token Not Found");
    return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const gateSecurity = await GateSecurity.findOne({ jwtToken: token });
    console.log(gateSecurity);
    if (!gateSecurity) {
      console.log("MessSecurity not found");
      return res.status(403).json({ msg: "Unauthorized access: GateSecuritySecurity not found" });
    }

    if (messSecurity.role !== "GateSecurity") {
      console.log("Unauthorized access: Incorrect role");
      return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
    }

    next();
  } catch (err) {
    console.error("Error verifying token:", err);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    } else {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  verifyGateSecurity,
};