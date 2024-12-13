import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import MedicineDetails from './components/MedicineDetails'; // Import your MedicineDetails component
import QRCodeWithLibrary from './components/QRCodeWithLibrary'; // Import your TestQRCode component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/medicines" element={<MedicineList />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} /> {/* Route for details */}
        <Route path="/QRCodeWithLibrary" element={<QRCodeWithLibrary />} /> {/* Route for testing QR Code */}
      </Routes>
    </Router>
  );
}

export default App;
