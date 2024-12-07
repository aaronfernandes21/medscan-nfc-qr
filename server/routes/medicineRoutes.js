const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new medicine
router.post('/', async (req, res) => {
    const medicine = new Medicine({
        name: req.body.name,
        expiryDate: req.body.expiryDate,
        uses: req.body.uses,
        manufacturingDate: req.body.manufacturingDate,
    });

    try {
        const newMedicine = await medicine.save();
        res.status(201).json(newMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
