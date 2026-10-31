import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionioInstqnce = await mongoose.connect
        (process.env.MONGODB_URI)
        console.log(`\n MongoDB Connected!!!
            ${connectionioInstqnce.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
        