const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines
// GET all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single medicine by ID
router.get('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new medicine
router.post('/', async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Log the incoming request data

        // Destructure the request body
        const { name, expiryDate, uses, manufacturingDate } = req.body;

        if (!name || !expiryDate || !uses || !manufacturingDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new Medicine instance
        const newMedicine = new Medicine({
            name,
            expiryDate,
            uses,
            manufacturingDate
        });

        // Save the medicine to the database
        const savedMedicine = await newMedicine.save();
        console.log('Saved Medicine:', savedMedicine);  // Log the saved medicine

        // Respond with the saved medicine
        res.status(201).json(savedMedicine);
    } catch (err) {
        console.error('Error adding medicine:', err);  // Log any errors
        res.status(500).json({ message: 'Failed to add medicine', error: err.message });
    }
});

// Update an existing medicine by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                expiryDate: req.body.expiryDate,
                uses: req.body.uses,
                manufacturingDate: req.body.manufacturingDate,
            },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(updatedMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a medicine by ID
router.delete('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
router.post('/', async (req, res) => {
    try {
        // Destructure the request body
        const { name, expiryDate, uses, manufacturingDate } = req.body;

        // Create a new Medicine instance
        const newMedicine = new Medicine({
            name,
            expiryDate,
            uses,
            manufacturingDate
        });

        // Save the medicine to the database
        const savedMedicine = await newMedicine.save();

        // Respond with the saved medicine
        res.status(201).json(savedMedicine);
    } catch (err) {
        console.error('Error adding medicine:', err);
        res.status(500).json({ message: 'Failed to add medicine', error: err.message });
    }
});

