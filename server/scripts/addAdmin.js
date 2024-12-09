const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./server/models/User'); // Adjust the path to your User model

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/medicine-inventory'; // Replace with your actual MongoDB URI

// Function to create an admin user
async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if an admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin already exists.');
            return;
        }

        // Create a new admin user
        const salt = await bcrypt.genSalt(10); // Generate salt for bcrypt
        const hashedPassword = await bcrypt.hash('adminpassword', salt); // Replace with your desired admin password

        const adminUser = new User({
            username: 'admin', // Replace with your desired username
            password: hashedPassword, // Store the hashed password
            role: 'admin', // Set role as 'admin'
        });

        // Save the new admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully!');
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Run the function
createAdmin();
