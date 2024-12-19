import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MedicineList.css';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]); // Initializing state for medicines
    const [error, setError] = useState(null); // State to handle errors during API call
    const [loading, setLoading] = useState(true); // State to handle loading state

    useEffect(() => {
        // Fetch all medicines from the server using the BASE_URL from the environment variable
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/medicines`) // Use the correct API endpoint
            .then((response) => {
                console.log(response.data); // Log the response to check the format
                // Assuming the response contains an array of medicines
                if (Array.isArray(response.data)) {
                    setMedicines(response.data); // Set the list of medicines if it's an array
                } else if (response.data.medicines) {
                    setMedicines(response.data.medicines); // Access the 'medicines' array if it's inside an object
                } else {
                    setMedicines([]); // Fallback to empty array if no medicines found
                }
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError('Error fetching medicines');
                setLoading(false); // Set loading to false if there's an error
                console.error('Error fetching medicines:', err);
            });
    }, []); // Empty dependency array to run only once when the component mounts

    if (loading) {
        return <div className="loading">Loading medicines...</div>; // Show loading message
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Show error message
    }

    return (
        <div className="container mt-5">
            <h1>Medicine List</h1>
            <table className={`table ${!loading ? 'visible' : ''}`}> {/* Add visible class when data is loaded */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Expiry Date</th>
                        <th>Manufacturing Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.length === 0 ? (
                        <tr>
                            <td colSpan="4">No medicines available</td>
                        </tr>
                    ) : (
                        medicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td>{medicine.name}</td>
                                <td>{medicine.expiryDate}</td>
                                <td>{medicine.manufacturingDate}</td>
                                <td>
                                    <Link to={`/medicine/${medicine._id}`} className="btn btn-info">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineList;
