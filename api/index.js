import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.route.js"


const app = express();
app.use(express.json())

mongoose.connect(`${process.env.MONGO}`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.listen(3000, () => console.log(`Server running on port 3000 !! `));

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);