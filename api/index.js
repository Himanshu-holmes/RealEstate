import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';


const app = express();

mongoose.connect(`${process.env.MONGO}`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.listen(3000, () => console.log(`Server running on port 3000 !! `));

app.use("/api/user",userRouter);