import mongoose, { connect } from "mongoose";


const connectDatabase = async(req, res) =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected.")
    } catch (error) {
        console.log('Database Connection Error:', error)
    }
};

export default connectDatabase;