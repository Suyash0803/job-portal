const jobsModel=require('../models/jobModel');

const updateJob=async(req,res,next)=>{
    const {id}=req.params;
    const {company,position}=req.body;

    if(!company||!position){
         next('Please provide all fields');
    }
    const job=await jobsModel.findOne({_id:id});
    console.log(job);
    if(!job){
         next('Job not found');
    }
    // console.log(job.createdBy.toString());
    // if(!req.user.userID===job.createdBy.toString()){
    //     next('Not authorized to update this job');
    // }
    const updatedJob=await jobsModel.findByIdAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    });
    console.log(updatedJob);
    res.status(200).json({updatedJob});
}
module.exports=updateJob;