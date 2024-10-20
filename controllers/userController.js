 
const User = require("../models/User");

const getUsers = async (req, res) => {
    const query = req.query.new;
  
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
  
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.userID });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userID,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}

const getStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: lastYear },
          },
        },
        { 
          $project: {
          month: { $month: "$createdAt"},
        },
      },
      {
        $group:{
          _id:"$month",
          total: { $sum: 1 },
        }
      }
      ]);
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.userID });
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}
  
  module.exports = {
    getUsers,
    getUser,
    updateUser,
    getStats,
    deleteUser
}