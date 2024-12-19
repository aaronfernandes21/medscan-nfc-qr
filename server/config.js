const dotenv = require("dotenv");
dotenv.config(); 

const mongoose = require("mongoose");

// Base URL for API (removed trailing space)
const BASE_URL = "https://74a2-125-18-25-132.ngrok-free.app"; 

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = { connectDB, BASE_URL };
