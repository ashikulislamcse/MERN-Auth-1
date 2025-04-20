import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());



const PORT = process.env.PORT || 5001
app.listen(PORT, (req, res) => {
    console.log(`Server is Running on Port:${PORT}`);
});