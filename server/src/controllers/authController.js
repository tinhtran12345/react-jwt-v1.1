const User = require("../models/user");

const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    try {
    } catch (error) {
        res.status(500).json(error);
    }
};

const loginUser = (req, res) => {
    try {
    } catch (error) {
        res.status(500).json(error);
    }
};

const logoutUser = (req, res) => {
    try {
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, logoutUser };
