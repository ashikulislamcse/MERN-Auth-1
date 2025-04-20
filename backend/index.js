import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());




app.listen(5000, (req, res) => {
    console.log(`Server is Running on Port:5000`);
});