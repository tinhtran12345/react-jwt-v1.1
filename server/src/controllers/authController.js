const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = [];
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "100s" }
    );
};
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "3m" }
    );
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        console.log(req.body.username);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = await new User({
            username: username,
            email: email,
            password: hashed,
        });
        // save to db
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json("Incorrect username");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json("Incorrect password");
        }

        if (user && validPassword) {
            // create access token
            const accessToken = generateAccessToken(user);
            // Create fresh token
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken, refreshToken });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const logoutUser = async (req, res) => {
    try {
        // clear cookie when user logs out
        refreshTokens = refreshTokens.filter((token) => {
            return token !== req.body.token;
        });

        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};
const requestRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json("You're not authenticated");
        else if (!refreshTokens.includes(refreshToken))
            return res.status(403).json(" Refresh token is not valid!");

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );

            // create new access and refresh token
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            return res.status(200).json({
                accessToken: newAccessToken,
            });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, logoutUser, requestRefreshToken };
