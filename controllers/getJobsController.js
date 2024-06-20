const jobsModel=require('../models/jobModel');

const getAllJobs=async(req,res,next)=>{
    const jobs=await jobsModel.find({createdBy:req.user.userID});
    console.log
    res.status(200).json({
        totalJobs:jobs.length,
        jobs
    });
}

module.exports=getAllJobs;