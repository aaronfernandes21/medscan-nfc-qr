const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    uses: {
        type: String,
        required: true
    },
    manufacturingDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Medicine', medicineSchema);
