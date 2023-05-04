const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    const refreshToken = req.cookies.refreshToken;

    if (token) {
        const accessToken = token;
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You're not authenticated");
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You're not allowed that!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndUserAuthorization };
