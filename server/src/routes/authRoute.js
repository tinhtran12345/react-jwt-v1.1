const authController = require("../controllers/authController");
const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", verifyToken, authController.logoutUser);
router.post("/refresh", authController.requestRefreshToken);

module.exports = router;
