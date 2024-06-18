const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const updateController = require('../controllers/userController');
const errorMiddleware = require('../middlewares/errorMiddleware');


const router=express.Router();




router.put('/update',userAuth,errorMiddleware,updateController);
module.exports = router;