const express = require('express');
const { LoginUser, SignupUser } = require('../controllers/userController');

const router = express.Router();


// login user
router.post('/login', LoginUser)

// signup user
router.post('/signup', SignupUser)

module.exports = router;