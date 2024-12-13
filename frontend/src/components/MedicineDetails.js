import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import './MedicineDetails.css';

const MedicineDetails = () => {
    const { id } = useParams(); // Get the medicine ID from the URL
    const [medicine, setMedicine] = useState(null); // Store the medicine data
    const [qrCode, setQRCode] = useState(''); // Store the QR code
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the medicine data from the backend by ID
        axios
            .get(`http://localhost:5000/api/medicines/${id}`)
            .then((response) => {
                const medicineData = response.data;
                setMedicine(medicineData);

                // Generate QR code for the medicine ID
                QRCode.toDataURL(medicineData._id)
                    .then((url) => setQRCode(url))
                    .catch((err) => console.error('Error generating QR code:', err));
            })
            .catch((err) => {
                console.error('Error fetching medicine details:', err);
                setError('Failed to fetch medicine details');
            });
    }, [id]); // Re-run the effect if the ID changes

    return (
        <div className="medicine-details-container">
            {error && <p className="medicine-details-error">{error}</p>}
            {medicine ? (
                <div>
                    <h1>{medicine.name}</h1>
                    <p><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
                    <p><strong>Manufacturing Date:</strong> {medicine.manufacturingDate}</p>
                    <p><strong>Uses:</strong> {medicine.uses}</p>

                    {/* QR Code Section */}
                    <div className="qr-code-section">
                        {qrCode ? (
                            <>
                                <h3>QR Code:</h3>
                                <img src={qrCode} alt="QR Code" />
                            </>
                        ) : (
                            <p>Generating QR Code...</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="medicine-details-loading">Loading...</p>
            )}
        </div>
    );
};

export default MedicineDetails;
