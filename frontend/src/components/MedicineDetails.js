import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MedicineDetails = () => {
    const { id } = useParams(); // Get the medicine ID from the URL
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the medicine details from the backend
        const fetchMedicine = async () => {
            try {
                console.log(`Fetching medicine details for ID: ${id}`); // Debug log
                const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
                
                if (response.data) {
                    console.log('Medicine details fetched successfully:', response.data); // Debug log
                    setMedicine(response.data);
                } else {
                    console.warn('No medicine found with this ID.');
                    setError('No medicine found with this ID.');
                }
            } catch (err) {
                console.error('Error fetching medicine details:', err.response || err.message);
                setError(err.response?.data?.message || 'Failed to fetch medicine details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMedicine();
        } else {
            console.error('Medicine ID is undefined.');
            setError('Invalid medicine ID.');
            setLoading(false);
        }
    }, [id]);

    // Handle loading state
    if (loading) return <p>Loading...</p>;

    // Handle error state
    if (error) return <p>{error}</p>;

    // Handle case when no medicine is found
    if (!medicine) return <p>No medicine found with this ID.</p>;

    return (
        <div>
            <h1>Medicine Details</h1>
            <p><strong>Name:</strong> {medicine.name}</p>
            <p><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
            <p><strong>Uses:</strong> {medicine.uses}</p>
            <p><strong>Manufacturing Date:</strong> {medicine.manufacturingDate}</p>
            {medicine.qrCode && (
                <div>
                    <p><strong>QR Code:</strong></p>
                    <img src={medicine.qrCode} alt={`${medicine.name} QR Code`} />
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;
