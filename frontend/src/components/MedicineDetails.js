import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {
    const { id } = useParams();  // Extract medicine ID from URL
    const [medicine, setMedicine] = useState(null);

    useEffect(() => {
        // Fetch the medicine details based on the ID from the URL
        axios.get(`http://localhost:5000/medicines/${id}`)
            .then((response) => {
                setMedicine(response.data);  // Store fetched medicine details in the state
            })
            .catch((error) => {
                console.error('There was an error fetching the medicine details!', error);
            });
    }, [id]);

    return (
        <div>
            {medicine ? (
                <div>
                    <h2>{medicine.name}</h2>
                    <p><strong>Expiry Date:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                    <p><strong>Uses:</strong> {medicine.uses}</p>
                    <p><strong>Manufacturing Date:</strong> {new Date(medicine.manufacturingDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading medicine details...</p>
            )}
        </div>
    );
};

export default MedicineDetails;
