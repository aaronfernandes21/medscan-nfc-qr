const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    uses: { type: String, required: true },
    manufacturingDate: { type: Date, required: true }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;
