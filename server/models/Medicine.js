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
  manufacturer: String,
  uses: String
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
