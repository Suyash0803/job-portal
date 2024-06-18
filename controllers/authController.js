const User=require('../models/userModel');

const authController=async(req,res,next)=>{
   
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
        const token=user.createJWT();
        res.status(201).json({
            success:true,
            message:'User created successfully',
            // data:user,
            user:{
                email:user.email,
                role:user.role,
                name:user.name

            },
            token
        })
    
    // catch(err){
        // res.status(500).send({
        //     success:false,
        //     message:err.message

}

const loginController=async(req,res,next)=>{
    const {email,password}=req.body;
    // validation
    if(!email || !password){
        next("Please provide an email and password");
    }
    const user=await User.findOne({email}).select('+password');
    if(!user){
        next("User not found");
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        next("Invalid credentials");
    }
    user.password=undefined;
    const token=user.createJWT();
    res.status(200).json({
        success:true,
        message:'User logged in successfully',
        user:{
            email:user.email,
            role:user.role,
            name:user.name
        },
        token
    })
}


module.exports={authController,loginController};