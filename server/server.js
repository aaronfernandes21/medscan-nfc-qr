// server.js (Node.js/Express backend)

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();

app.use(cors()); // Enable CORS to allow cross-origin requests from your frontend
app.use(express.json());

// In-memory data store
const medicines = [
  {
    _id: '1',
    name: 'Aspirin',
    expiryDate: '2025-12-31',
    uses: 'Pain relief',
    manufacturingDate: '2022-01-01',
    qrCode: 'https://example.com/qr1.png',
  },
  {
    _id: '2',
    name: 'Paracetamol',
    expiryDate: '2026-12-31',
    uses: 'Fever reducer',
    manufacturingDate: '2023-01-01',
    qrCode: 'https://example.com/qr2.png',
  },
];

// GET all medicines
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

// GET a single medicine by ID
app.get('/api/medicines/:id', (req, res) => {
  const medicine = medicines.find(m => m._id === req.params.id);
  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
  }
  res.json(medicine);
});

// POST a new medicine
app.post('/api/medicines', (req, res) => {
  const { name, expiryDate, uses, manufacturingDate, qrCode } = req.body;

  // Basic validation
  if (!name || !expiryDate || !uses || !manufacturingDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a new medicine object
  const newMedicine = {
    _id: uuidv4(), // Generate a unique ID
    name,
    expiryDate,
    uses,
    manufacturingDate,
    qrCode: qrCode || '', // Optional QR code field
  };

  medicines.push(newMedicine); // Add to the in-memory data store

  res.status(201).json(newMedicine); // Respond with the newly created medicine
});

// PUT (update) an existing medicine by ID
app.put('/api/medicines/:id', (req, res) => {
  const { id } = req.params;
  const { name, expiryDate, uses, manufacturingDate, qrCode } = req.body;

  const medicineIndex = medicines.findIndex(m => m._id === id);

  if (medicineIndex === -1) {
    return res.status(404).json({ message: 'Medicine not found' });
  }

  // Update the medicine object
  medicines[medicineIndex] = {
    ...medicines[medicineIndex],
    name: name || medicines[medicineIndex].name,
    expiryDate: expiryDate || medicines[medicineIndex].expiryDate,
    uses: uses || medicines[medicineIndex].uses,
    manufacturingDate: manufacturingDate || medicines[medicineIndex].manufacturingDate,
    qrCode: qrCode || medicines[medicineIndex].qrCode,
  };

  res.json(medicines[medicineIndex]); // Respond with the updated medicine
});

// DELETE a medicine by ID
app.delete('/api/medicines/:id', (req, res) => {
  const { id } = req.params;

  const medicineIndex = medicines.findIndex(m => m._id === id);

  if (medicineIndex === -1) {
    return res.status(404).json({ message: 'Medicine not found' });
  }

  medicines.splice(medicineIndex, 1); // Remove the medicine from the array

  res.json({ message: 'Medicine deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
