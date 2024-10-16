const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const  { 
  getUsers,
  getUser,
  updateUser,
  deleteUser 
} = require('../controllers/userController.js')

router.get('/',verifyTokenAndAdmin, getUsers)

router.get('/:userID',verifyTokenAndAdmin, getUser)

router.put('/:userID',verifyTokenAndAdmin, updateUser) 

router.delete('/:userID',verifyTokenAndAdmin, deleteUser)

module.exports = router;
