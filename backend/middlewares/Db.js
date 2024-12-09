const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGO_URL;

const Dbconnect = async () => {
    try {
        await mongoose.connect(url)
        console.log('Db connected');
    }
    catch (err) {
        console.log(err);

    }
}

module.exports = Dbconnect;