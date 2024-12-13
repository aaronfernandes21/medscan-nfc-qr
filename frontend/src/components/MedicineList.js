import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MedicineList.css';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]); // Initializing state for medicines
    const [error, setError] = useState(null); // State to handle errors during API call
    const [loading, setLoading] = useState(true); // State to handle loading state

    useEffect(() => {
        // Fetch all medicines from the server
        axios
            .get('http://localhost:5000/api/medicines')
            .then((response) => {
                setMedicines(response.data); // Set the list of medicines
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError('Error fetching medicines');
                setLoading(false); // Set loading to false if there's an error
                console.error('Error fetching medicines:', err);
            });
    }, []); // Empty dependency array to run only once when the component mounts

    if (loading) {
        return <div>Loading medicines...</div>; // Display loading message while fetching data
    }

    if (error) {
        return <div>{error}</div>; // Display error message if there's an issue with the fetch
    }

    return (
        <div className="container mt-5">
            <h1>Medicine List</h1>
            <table className="table">
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
                                    {/* Link to the medicine details page */}
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
