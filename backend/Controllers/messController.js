const MessSecurity = require("../models/messSecurity");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";
const bcrypt = require("bcryptjs");

/**
 * Register a new MessSecurity user
 */
const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the name already exists
    const existingUser = await MessSecurity.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ msg: "name already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new MessSecurity user
    const user = await MessSecurity.create({
      name,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "MessSecurity user registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "An error occurred while registering the user",
    });
  }
};

/**
 * Login as MessSecurity and generate JWT
 */
const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the user exists
    const user = await MessSecurity.findOne({ name });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {id:user._id,role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.jwtToken = token;

    user.save();

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while logging in" });
  }
};

/**
 * Update MessSecurity user details
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Get schema fields
    const schemaFields = Object.keys(MessSecurity.schema.paths);

    // Check for unknown fields
    for (const key in updates) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({ msg: `Unknown field: ${key}` });
      }
    }

    // Hash password if being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Update user
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

/**
 * Delete a MessSecurity user
 */
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

/**
 * Middleware to verify JWT and role
 */

const verifyMessSecurity = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  console.log(token);

  if (!token) {
    console.log("Token Not Found");
    return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
  }
  try {
    const decoded = jwt.verify(token,JWT_SECRET); 

    // Find the user (MessSecurity) associated with the token's user ID
    const messSecurity = await MessSecurity.findById(decoded.id);
    console.log(messSecurity);
    if (!messSecurity) {
      console.log("MessSecurity not found");
      return res.status(403).json({ msg: "Unauthorized access: MessSecurity not found" });
    }

    // Check if the role is 'MessSecurity'
    if (messSecurity.role !== "MessSecurity") {
      console.log("Unauthorized access: Incorrect role");
      return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
    }

    // Attach the messSecurity user to the request object
    // req.messSecurity = messSecurity;
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
  verifyMessSecurity,
};
