const express=require('express');  
const router=express.Router();
const createJob=require('../controllers/jobController');
const userAuth=require('../middlewares/authMiddleware');
// const getAllJobs=require('../controllers/jobController');
const getAllJobs=require('../controllers/getJobsController');
const updateJob = require('../controllers/updateJobController');
const deleteJob = require('../controllers/deleteJobController');

router.post('/create-job',userAuth,createJob);

router.get('/all-jobs',userAuth,getAllJobs);

router.patch('/update-job/:id',userAuth,updateJob);

router.delete('/delete-job/:id',userAuth,deleteJob);
module.exports=router;