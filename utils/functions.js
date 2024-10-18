const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getInformation = async (req, res) => {
    const decoded = jwt.verify(req.headers['token'].replace("Bearer ", ""), process.env.JWT_SEC);
    const user = await User.findOne({ _id: decoded.id });
    return {
        "users": {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    };
}

module.exports = {
    getInformation
}