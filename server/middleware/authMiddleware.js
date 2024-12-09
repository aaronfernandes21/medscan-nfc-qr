const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated and an admin
const isAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
        req.user = decoded; // Add decoded user info to request object
        
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admins only.' });
        }
        
        next(); // User is authenticated and is an admin, so proceed to the next middleware/route handler
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = isAdmin;
