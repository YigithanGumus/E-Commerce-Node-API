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
} = require('../controllers/users.js')

router.get('/', getUsers)

router.get('/:userID', getUser)

router.put('/:userID', updateUser) 

router.delete('/:userID', deleteUser)

module.exports = router;
