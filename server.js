const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
const colors=require('colors');
const connectDB = require('./config/db');
const testRouter = require('./routes/test');
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('express-async-errors');
// dotenv configuration
dotenv.config()
// Database connection
connectDB();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test',testRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);

// validation middleware
app.use(errorMiddleware);



const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan.black);
})