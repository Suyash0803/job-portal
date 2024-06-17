const express = require('express');
// const { testController } = require('../controllers/testController');
const {authController} = require('../controllers/authController');
const router = express.Router();

router.post('/register',authController);

module.exports = router;
