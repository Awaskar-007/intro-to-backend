import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (err) => {
            console.error("Server error:", err);
        });

        app.listen(process.env.PORT || 6000, () => {
            console.log(`Server is running on port
                 ${process.env.PORT || 6000}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed!!", error);
        process.exit(1);
    }
};

startServer();