import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect(`${process.env.MONGO}`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.listen(3000, () => console.log(`Server running on port 3000 !! `));

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        
    })
})