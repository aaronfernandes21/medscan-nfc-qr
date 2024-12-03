const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// GET route to fetch all medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route to add a new medicine
router.post('/', async (req, res) => {
  try {
    const { name, description, expiryDate } = req.body;

    // Validate input
    if (!name || !description || !expiryDate) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Create new medicine
    const newMedicine = new Medicine({
      name,
      description,
      expiryDate,
    });

    // Save to database
    await newMedicine.save();

    res.status(201).json(newMedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route to update a medicine by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, expiryDate } = req.body;

    // Validate input
    if (!name || !description || !expiryDate) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Find medicine by ID and update
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, description, expiryDate },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(updatedMedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route to delete a medicine by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
