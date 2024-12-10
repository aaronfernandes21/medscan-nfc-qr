// // authRoutes.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Assuming your User model is set up
// const router = express.Router();

// // POST /login route to authenticate the user
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Find user by username
//         const user = await User.findOne({ username });
        
//         if (!user || user.password !== password) {
//             // If user is not found or password doesn't match
//             return res.status(400).json({ message: 'Invalid username or password' });
//         }

//         // Generate JWT token if the user exists and password matches
//         const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//             expiresIn: '1h', // Token expires in 1 hour
//         });

//         res.status(200).json({ token });
//     } catch (err) {
//         console.error('Error logging in:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
