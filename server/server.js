const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const medicineRoutes = require('./routes/medicineRoutes');  // Ensure correct path to routes

const app = express();

// CORS configuration (if frontend and backend are on different ports)
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Use the medicine routes for /medicines endpoint
app.use('/medicines', medicineRoutes);  // Add this to ensure the routes are handled

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicine-inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});
