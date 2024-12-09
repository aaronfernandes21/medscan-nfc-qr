import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Link for navigation
import MedicineList from './components/MedicineList'; // Make sure path is correct
import MedicineDetails from './components/MedicineDetails'; // Make sure path is correct
import AddMedicine from './components/AddMedicine'; // Make sure path is correct

function App() {
  return (
    <Router>
      <div>
        <h1>Medicine Inventory</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link> {/* Use Link instead of <a> for navigation */}
            </li>
            <li>
              <Link to="/add-medicine">Add Medicine</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
