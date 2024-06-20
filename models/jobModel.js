const mongoose=require('mongoose');
const { Schema } = mongoose;
const User = require('./userModel');
const jobSchema=new Schema({
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:[true,'Please enter the position'],
        // minlength:100
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    workType:{
        type:String,
        enum:['full-time','part-time','contract','freelance','internship'],
        default:'full-time'
    },
    workLocation:{
        type:String,
        default:'Mumbai',
        required:[true,'Please enter the location']
    },
    createdBy:{
        type:String,
        ref:'User',
        
    }
},{timestamps:true});

module.exports=mongoose.model('Job',jobSchema);