import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
    // State variables to hold input values
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uses, setUses] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page refresh

        const newMedicine = {
            name,
            expiryDate,
            uses,
            manufacturingDate,
        };

        // Send POST request to the backend API
        axios.post('http://localhost:5000/medicines', newMedicine)
            .then((response) => {
                alert('Medicine added successfully!');
                console.log('Response:', response.data);  // Log the response for debugging
            })
            .catch((error) => {
                console.error('Error adding medicine:', error.response?.data || error.message);
                alert('Failed to add medicine');
            });
    };

    return (
        <div>
            <h2>Add New Medicine</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Expiry Date:
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Uses:
                    <input
                        type="text"
                        value={uses}
                        onChange={(e) => setUses(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Manufacturing Date:
                    <input
                        type="date"
                        value={manufacturingDate}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Medicine</button>
            </form>
        </div>
    );
};

export default AddMedicine;
