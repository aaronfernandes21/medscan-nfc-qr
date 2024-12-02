const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const medicineRoutes = require('./routes/medicineRoutes'); // Import the routes

dotenv.config();

const app = express();

// Middleware to parse JSON data from request bodies
app.use(express.json());

// Use medicine routes
app.use('/api/medicines', medicineRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.log('Database connection failed:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
