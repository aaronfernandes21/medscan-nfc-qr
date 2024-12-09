const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true } // You can define roles like "admin", "user", etc.
});

const User = mongoose.model('User', userSchema);
module.exports = User;
