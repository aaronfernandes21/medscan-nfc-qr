// server.js (Node.js/Express backend)

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS to allow cross-origin requests from your frontend
app.use(express.json());

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

app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

app.get('/api/medicines/:id', (req, res) => {
  const medicine = medicines.find(m => m._id === req.params.id);
  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
  }
  res.json(medicine);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
