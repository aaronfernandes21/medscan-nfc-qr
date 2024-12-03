const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// GET all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medicines", error: error.message });
    }
});

// POST a new medicine
router.post('/', async (req, res) => {
    const { name, manufacturer, expiryDate, uses } = req.body;

    // Validate request body
    if (!name || !manufacturer || !expiryDate || !uses) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Create a new medicine document
        const newMedicine = new Medicine({ name, manufacturer, expiryDate, uses });
        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    } catch (error) {
        res.status(500).json({ message: "Error adding medicine", error: error.message });
    }
});

module.exports = router;
