const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Medicine = require('../models/Medicine');
const QRCode = require('qrcode');
const { BASE_URL } = require('../config'); // Import BASE_URL from config

// GET all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        console.error('Error fetching medicines:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET single medicine by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid medicine ID format.' });
        }

        const medicine = await Medicine.findById(id);

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.status(200).json(medicine);
    } catch (err) {
        console.error('Error fetching medicine:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Generate and return the QR code for a particular medicine
router.get('/:id/qr-code', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid medicine ID format.' });
        }

        const medicine = await Medicine.findById(id);

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Generate QR code URL
        const medicineUrl = `${BASE_URL}/medicine/${medicine._id}`;
        const qrCode = await QRCode.toDataURL(medicineUrl);

        res.json({ qrCode }); // Return the QR code as response
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create a new medicine
router.post('/', async (req, res) => {
    try {
        const { name, expiryDate, uses, manufacturingDate } = req.body;

        // Validate input fields
        if (!name || !expiryDate || !uses || !manufacturingDate) {
            return res.status(400).json({ message: 'All fields are required.' });
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

        // Generate QR Code containing the URL to the medicine details
        const medicineUrl = `${BASE_URL}/medicine/${savedMedicine._id}`;
        const qrCode = await QRCode.toDataURL(medicineUrl);

        // Update the saved medicine with the QR Code
        savedMedicine.qrCode = qrCode;
        await savedMedicine.save();

        res.status(201).json(savedMedicine);
    } catch (err) {
        console.error('Error adding medicine:', err);
        res.status(500).json({ message: 'Failed to add medicine', error: err.message });
    }
});

// Update an existing medicine by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, expiryDate, uses, manufacturingDate } = req.body;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid medicine ID format.' });
        }

        // Validate input fields
        if (!name || !expiryDate || !uses || !manufacturingDate) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedMedicine = await Medicine.findByIdAndUpdate(
            id,
            { name, expiryDate, uses, manufacturingDate },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(updatedMedicine);
    } catch (err) {
        console.error('Error updating medicine:', err);
        res.status(500).json({ message: 'Failed to update medicine', error: err.message });
    }
});

// Delete a medicine by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid medicine ID format.' });
        }

        const medicine = await Medicine.findByIdAndDelete(id);

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        console.error('Error deleting medicine:', err);
        res.status(500).json({ message: 'Failed to delete medicine', error: err.message });
    }
});

module.exports = router;
