import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uses, setUses] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem('token'); 

        if (!token) {
            setError('You must be logged in to add medicine.');
            return;
        }

        axios.post('http://localhost:5000/api/medicines', {
            name,
            expiryDate,
            uses,
            manufacturingDate
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include the JWT token in the request header
            }
        })
        .then(response => {
            console.log('Medicine added:', response.data);
            // Optionally, clear the form fields or redirect after successful submission
            setName('');
            setExpiryDate('');
            setUses('');
            setManufacturingDate('');
        })
        .catch(err => {
            console.error('Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to add medicine');
        });
    };

    return (
        <div>
            <h1>Add New Medicine</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <br />
                
                <label>Expiry Date:</label>
                <input 
                    type="date" 
                    value={expiryDate} 
                    onChange={(e) => setExpiryDate(e.target.value)} 
                    required
                />
                <br />

                <label>Uses:</label>
                <input 
                    type="text" 
                    value={uses} 
                    onChange={(e) => setUses(e.target.value)} 
                    required
                />
                <br />

                <label>Manufacturing Date:</label>
                <input 
                    type="date" 
                    value={manufacturingDate} 
                    onChange={(e) => setManufacturingDate(e.target.value)} 
                    required
                />
                <br />
                
                <button type="submit">Add Medicine</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddMedicine;
