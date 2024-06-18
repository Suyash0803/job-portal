const express = require('express');
// const { testController } = require('../controllers/testController');
const {authController,loginController} = require('../controllers/authController');
const errorMiddleware = require('../middlewares/errorMiddleware');
const router = express.Router();

// register route
router.post('/register',errorMiddleware,authController);

// login route
router.post('/login',errorMiddleware,loginController);
module.exports = router;
