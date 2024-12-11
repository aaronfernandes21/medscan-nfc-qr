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

        axios
            .post('http://localhost:5000/api/medicines', {
                name,
                expiryDate,
                uses,
                manufacturingDate,
            })
            .then((response) => {
                console.log('Medicine added:', response.data);
                setName('');
                setExpiryDate('');
                setUses('');
                setManufacturingDate('');
            })
            .catch((err) => {
                console.error('Error:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Failed to add medicine');
            });
    };

    return (
        <div className="container mt-5">
            <h1>Add New Medicine</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Uses:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={uses}
                        onChange={(e) => setUses(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manufacturing Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={manufacturingDate}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Medicine
                </button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default AddMedicine;
