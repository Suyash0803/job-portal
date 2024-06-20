const jobsModel=require('../models/jobModel');

const deleteJob=async(req,res,next)=>{
    const {id}=req.params;
    const job=await jobsModel.findOne({_id:id});
    if(!job){
        next('Job not found');
    }
    // if(!req.user.userID===job.createdBy.toString()){
    //     next('Not authorized to delete this job');
    // }
    await jobsModel.findByIdAndDelete({_id:id});
    res.status(200).json({msg:'Job deleted successfully'});
}
module.exports=deleteJob;