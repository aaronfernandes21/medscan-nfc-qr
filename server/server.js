require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { BASE_URL } = require('./config'); // Import BASE_URL

const app = express();

app.use(cors()); // Enable CORS to allow cross-origin requests from your frontend
app.use(express.json());

// Sample in-memory data store for medicines
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

// Route to get all medicines
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

// Route to get single medicine by ID
app.get('/api/medicines/:id', (req, res) => {
  const medicine = medicines.find(m => m._id === req.params.id);
  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
  }
  res.json(medicine);
});

// Route to post a new medicine
app.post('/api/medicines', async (req, res) => {
  const { name, expiryDate, uses, manufacturingDate } = req.body;

  if (!name || !expiryDate || !uses || !manufacturingDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newMedicine = {
    _id: 'some-generated-id', // Generate an ID here (you can use UUID or similar)
    name,
    expiryDate,
    uses,
    manufacturingDate,
    qrCode: `${BASE_URL}/qr/${'some-generated-id'}` // Use BASE_URL to generate the QR code URL
  };

  medicines.push(newMedicine);
  res.status(201).json(newMedicine); // Return the newly created medicine
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
