import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();
import connectDatabase from './config/db.js';
import userRouter from './Routes/userRoute.js';
connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());




app.use('/api/user', userRouter)


const PORT = process.env.PORT || 5001
app.listen(PORT, (req, res) => {
    console.log(`Server is Running on Port:${PORT}`);
});