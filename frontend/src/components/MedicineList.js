import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        // Fetch medicines from the backend API
        axios.get('http://localhost:5000/medicines')
            .then((response) => {
                setMedicines(response.data);  // Store fetched medicines in the state
                setLoading(false);  // Set loading to false when data is fetched
            })
            .catch((error) => {
                setError(error.message);  // Handle error
                setLoading(false);  // Set loading to false even when there's an error
            });
    }, []);

    if (loading) {
        return <p>Loading medicines...</p>;  // Show loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>;  // Show error message if there's an issue
    }

    return (
        <div>
            <h1>Medicines List</h1>
            {medicines.length === 0 ? (
                <p>No medicines found. Add some medicines!</p>
            ) : (
                <ul>
                    {medicines.map((medicine) => (
                        <li key={medicine._id}>
                            <strong>{medicine.name}</strong>
                            <p>Expiry Date: {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                            <p>Uses: {medicine.uses}</p>
                            <p>Manufacturing Date: {new Date(medicine.manufacturingDate).toLocaleDateString()}</p>
                            <a href={`/medicine/${medicine._id}`}>View Details</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MedicineList;
