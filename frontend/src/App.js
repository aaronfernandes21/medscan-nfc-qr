import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMedicine from './components/AddMedicine'; // Make sure path is correct
import MedicineList from './components/MedicineList'; // Make sure path is correct
import MedicineDetails from './components/MedicineDetails'; // Make sure path is correct

function App() {
    return (
        <Router>
            <div>
                <h1>Medicine Inventory</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/add-medicine">Add Medicine</a>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<MedicineList />} />
                    <Route path="/add-medicine" element={<AddMedicine />} />
                    <Route path="/medicine/:id" element={<MedicineDetails />} /> {/* Path for viewing individual medicine details */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
