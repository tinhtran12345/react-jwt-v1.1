const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("CONNECTED TO MONGO DB");
        });
    } catch (error) {
        console.log("Connected database is failed" + error);
    }
};

module.exports = connectDatabase;
