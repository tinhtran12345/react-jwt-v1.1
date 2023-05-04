const User = require("../models/user");

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getAllUser, deleteUser };
