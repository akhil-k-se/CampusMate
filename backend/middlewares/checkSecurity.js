const MessSecurity = require("../models/messSecurity");
const GateSecurity = require("../models/gateSecurityModel");

const checkSecurity = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("The token is ", token);

    if (!token) {
        console.log("Token Not Found");
        return res.status(403).json({ msg: "Unauthorized access: Token not found" });
    }

    try {
        const messSecurity = await MessSecurity.findOne({ jwtToken: token });
        const gateSecurity = await GateSecurity.findOne({ jwtToken: token });

        if (messSecurity) {
            console.log("Authenticated as MessSecurity");
            if (messSecurity.role !== "MessSecurity") {
                console.log("Unauthorized access: Incorrect role for MessSecurity");
                return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
            }
            req.securityRole = "MessSecurity";
            next();
        } else if (gateSecurity) {
            console.log("Authenticated as GateSecurity");
            if (gateSecurity.role !== "GateSecurity") {
                console.log("Unauthorized access: Incorrect role for GateSecurity");
                return res.status(403).json({ msg: "Unauthorized access: Invalid role" });
            }
            req.securityRole = "GateSecurity";
            next();
        } else {
            console.log("Token not associated with any recognized security roles");
            return res.status(403).json({ msg: "Unauthorized access: Role not recognized" });
        }
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

module.exports = {checkSecurity};
