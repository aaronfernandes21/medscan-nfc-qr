// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import MedicineDetails from './components/MedicineDetails';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="bg-dark text-light">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
