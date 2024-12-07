import React from 'react';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';

function App() {
  return (
    <div className="App">
      <h1>Medicine NFC QR</h1>
      <AddMedicine />
      <MedicineList />
    </div>
  );
}

export default App;
