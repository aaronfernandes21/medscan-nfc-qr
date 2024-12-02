const express = require('express');
const Medicine = require('../models/Medicine');
const router = express.Router();

// Route to get all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export routes
module.exports = router;
