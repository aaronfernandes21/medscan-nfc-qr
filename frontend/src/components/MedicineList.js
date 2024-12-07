import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:5000/medicines')
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the medicines!', error);
            });
    }, []);

    return (
        <div>
            <h1>Medicines List</h1>
            <ul>
                {medicines.map(medicine => (
                    <li key={medicine._id}>
                        {medicine.name} - Expiry Date: {new Date(medicine.expiryDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MedicineList;
