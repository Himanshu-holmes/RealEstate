import express from 'express';
import mongoose from 'mongoose';


const app = express();

mongoose.connect(`${process.env.MONGO}`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.listen(3000, () => console.log(`Server running on port 3000 !! `));