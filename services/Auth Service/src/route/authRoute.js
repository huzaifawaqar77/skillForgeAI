const express = require('express');
const {loginController, signupController} = require("../controller/authController");
const router = express.Router();


router.post('/login', loginController);

router.post('/register', signupController);

module.exports = router;