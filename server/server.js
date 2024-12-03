const express = require('express'); // Import express
const dotenv = require('dotenv'); // Import dotenv for environment variables
const connectDB = require('./config'); // Import the database connection function

dotenv.config(); // Load environment variables

const app = express(); // Initialize the Express app

// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
const medicineRoutes = require('./routes/medicineRoutes'); // Import medicine routes
app.use('/medicines', medicineRoutes); // Define the route for medicines

// Database Connection
connectDB(); // Connect to the database

// Start the server
const PORT = process.env.PORT || 5000; // Get the port from the environment variables or use 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
