const jwt = require('jsonwebtoken');

require('dotenv').config();
console.log(process.env);
const JWT_SECRET = process.env.JWT_SECRET;


const storedUsername = process.env.ADMIN_USERNAME;
const storedPassword = process.env.ADMIN_PASSWORD;

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email," ",password," ",storedUsername," ",storedPassword);
    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (email === storedUsername) {
        const isPasswordCorrect = password === storedPassword
        if (isPasswordCorrect) {
            const token = jwt.sign({role:'super-admin'},JWT_SECRET);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // Send cookie over HTTPS only
                sameSite: "none",
                maxAge: 3600000
              });

            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
}

module.exports = {
    login
}