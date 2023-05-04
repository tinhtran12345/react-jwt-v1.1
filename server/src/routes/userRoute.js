const express = require("express");
const userController = require("../controllers/userController");
const {
    verifyTokenAndUserAuthorization,
    verifyToken,
} = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/all", verifyToken, userController.getAllUser);
router.delete(
    "/delete/:id",
    verifyTokenAndUserAuthorization,
    userController.deleteUser
);

module.exports = router;
