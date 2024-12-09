const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model for authentication
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If user is found and password matches, generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
