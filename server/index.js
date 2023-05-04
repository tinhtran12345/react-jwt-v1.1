const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./src/config/connectDB");
const bodyParser = require("body-parser");
const initRoute = require("./src/routes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDatabase();
// ROUTES
initRoute(app);
// CONNECT DB

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
