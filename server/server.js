const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the login route
const medicineRoutes = require('./routes/medicineRoutes'); // Your other routes
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes); // Auth routes (login)
app.use('/api/medicines', medicineRoutes); // Medicine routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicine-inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
