
const student = require("../models/studentModel");

const QRgetter = async (req,res) => {
    const token = req.cookies.token;
    
    const user = await student.findOne({token})
    if(user!=null)
    {
        return res.json(user.qrCode);
    }
    else{
        return res.json("No");
    }
}

module.exports = QRgetter;
