const User=require('../models/userModel');

const authController=async(req,res,next)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name)
            return res.status(400).json({msg:'Please provide a name'});
        // next("Please provide a name");
        if(!email){
            return res.status(400).json({msg:'Please enter all fields'});
            // next("Please provide email")
        }
        if(password.length<6){
            // next("Password must be at least 6 characters")
            return res.status(400).json({msg:'Password must be at least 6 characters'});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:'User already exists'});
        }
        const user=await User.create({name,email,password,role});
        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:user
        })
    }
    catch(err){
        // res.status(500).send({
        //     success:false,
        //     message:err.message
        // })
        next(err);
    }
}

module.exports={authController};