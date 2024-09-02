const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET  = 123
const bcrypt = require("bcrypt");
const register = async (req, res) => {
    try {
        const {
            name,
            hostel,
            role,
            email,
            password,
        } = req.body;
        const existingUser = await Admin.findOne({
            $or: [{ email: email }],
        });


        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                msg: "User already exists with this email",
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const admin = await Admin.create({
            name,
            hostel,
            role,
            email,
            password: hashedPassword,
        });
        console.log(admin);
        return res.status(201).json({
            msg: "User created successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Please check the details you have entered or try again later",
        });
    }
};
const login = async (req, res) => {
    try {
        console.log('Received login request:', req.body); // Debug log to see what is coming in

        const { email, password } = req.body;
        console.log(email,password)

        // Ensure all fields are filled
        for (const key in req.body) {
            if (!req.body[key] || req.body[key].trim() === "") {
                console.log(`Field ${key} is missing or empty`); // Debug log
                return res.status(400).json({
                    status: 400,
                    msg: `Field ${key} is missing or empty`,
                });
            }
        }
        const admin = await Admin.findOne({ email })
        console.log(admin)

        if (!admin) {
            console.log("User not found with the provided email")
            return res.status(401).json({ msg: "Incorrect credentials" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({ msg: "Incorrect credentials" });
        }

        console.log("Login successful, returning token")
        return res.status(200).json({msg:"done"});

    } catch (err) {
        console.error("Error during login:", err)
        return res.status(500).json({ msg: "An error occurred during login" });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = req.params._id;
        const update = req.body;

        // Get the schema paths (field names)
        const schemaFields = Object.keys(User.schema.paths);

        // Check for any unknown fields
        for (const key in update) {
            if (!schemaFields.includes(key)) {
                return res.status(400).json({
                    status: 400,
                    msg: `Unknown field: ${key}`,
                });
            }
            if (!update[key] || update[key].trim() === "") {
                return res.status(400).json({
                    status: 400,
                    msg: `Field ${key} is missing or empty`,
                });
            }
        }

        if (update.password) {
            update.password = await bcrypt.hash(update.password, 10);
        }

        const updateData = await User.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });

        if (!updateData) {
            return res.status(404).json({
                status: 404,
                msg: "User not found",
            });
        }

        res.json({
            status: 200,
            msg: "User updated successfully",
            updateData,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            status: 500,
            msg: "An error occurred while updating the user",
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params._id;
        const deleteData = await User.findByIdAndDelete(id);
        if (deleteData) {
            res.json({
                status: 200,
                msg: "User deleted successfully",
                data: deleteData,
            });
        } else {
            res.json({
                status: 404,
                msg: "User not found",
            });
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = { register, login, updateUser, deleteUser };