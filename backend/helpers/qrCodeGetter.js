
const student = require("../models/studentModel");

const QRgetter = async (req,res) => {
    const {enrollmentID} = req.params;
    
    const user = await student.findOne({enrollmentID})
    if(user!=null)
    {
        return res.json(user.qrCode);
    }
    else{
        return res.json("No");
    }
}

module.exports = QRgetter;
