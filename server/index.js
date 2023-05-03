const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./src/config/connectDB");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES

// CONNECT DB
connectDatabase();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
