const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config'); 

dotenv.config(); 

const app = express(); 

// Middleware
app.use(express.json()); 

// Routes
const medicineRoutes = require('./routes/medicineRoutes'); 
app.use('/medicines', medicineRoutes); 

// Database Connection
connectDB(); 

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
