import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uses, setUses] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMedicine = {
            name,
            expiryDate,
            uses,
            manufacturingDate,
        };

        axios.post('http://localhost:5000/medicines', newMedicine)
            .then(response => {
                alert('Medicine added successfully!');
            })
            .catch(error => {
                console.error('There was an error adding the medicine!', error);
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
                <label>
                    Expiry Date:
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Uses:
                    <input
                        type="text"
                        value={uses}
                        onChange={(e) => setUses(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Manufacturing Date:
                    <input
                        type="date"
                        value={manufacturingDate}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Medicine</button>
            </form>
        </div>
    );
};

export default AddMedicine;
