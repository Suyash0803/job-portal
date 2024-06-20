const jobsModel=require('../models/jobModel');

const createJob=async(req,res,next)=>{
    const {company,position}=req.body;
    if(!company||!position){
        next('Please provide all fields');
    }
    req.body.createdBy=req.user.userID;
    const job=await jobsModel.create(req.body);
    res.status(201).json({job});
}


module.exports=createJob;

// module.exports={createJob,getAllJobs};