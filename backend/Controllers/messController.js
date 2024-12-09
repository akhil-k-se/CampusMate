const MessSecurity = require("../models/messSecurity");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (/\d/.test(name)) {
      return res.status(400).json({ msg: "Name should not contain numbers" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    if (/\s/.test(password)) {
      return res.status(400).json({ msg: "Password should not contain spaces" });
    }
    if (password.length < 8) {
      return res.status(400).json({ msg: "Password should be at least 8 characters long" });
    }

    const existingUser = await MessSecurity.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email, role: 'mess-guard' }, JWT_SECRET);

    const user = await MessSecurity.create({
      name,
      email,
      password: hashedPassword,
      jwtToken: token
    });

    res.json(user);
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


    const user = await MessSecurity.findOne({ email });
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
      maxAge: 3600000
    })

    res.json({ token });
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

    // Delete user
    const deletedUser = await MessSecurity.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while deleting the user" });
  }
};


const checkSecurity = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("The token is ", token);

  if (!token) {
    console.log("Token Not Found");
    return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
  }
  try {

    const messSecurity = await MessSecurity.findOne({ jwtToken: token });
    console.log(messSecurity);
    if (!messSecurity) {
      console.log("MessSecurity not found");
      return res.status(403).json({ msg: "Unauthorized access: MessSecurity not found" });
    }

    if (messSecurity.role !== "MessSecurity") {
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
  checkSecurity,
};
