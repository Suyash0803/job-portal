const mongoose=require('mongoose');
const validator=require('validator');
const {Schema}=mongoose;


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
        select:false
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

module.exports=mongoose.model('User',userSchema);