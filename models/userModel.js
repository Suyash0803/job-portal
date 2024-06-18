const mongoose=require('mongoose');
const validator=require('validator');
const {Schema}=mongoose;
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function UserModel(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message: 'No Authorization Header'
        })
    }
    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Invalid Token Format'
            })
        }
        const decode = jwt.verify(token, SECRET_KEY);
        req.user = decode
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                error: error.message,
            })
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            })
        }
        res.status(500).json({
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack
        });
    }
}

module.exports = UserModel

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[50,'Name cannot exceed 50 characters']
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:[6,'Password must be at least 6 characters'],
        select:true
    },
    role:{
        type:String,
        enum:['user','publisher'],
        default:'user'
    },
   
    createdAt:{
        type:Date,
        default:Date.now
    }
});
// middleware
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return;
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

// compare password
userSchema.methods.comparePassword=async function(userPassword){
    const isMatch=await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

// Sign JWT and return
userSchema.methods.createJWT=function(){
    return jwt.sign({userID:this._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}

module.exports=mongoose.model('User',userSchema);