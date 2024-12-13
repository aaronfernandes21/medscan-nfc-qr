import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, ListGroup } from 'react-bootstrap';

const ExpiryAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/alerts')
            .then((response) => setAlerts(response.data))
            .catch((err) => console.error('Error fetching alerts:', err));
    }, []);

    return (
        <div className="mt-5">
            <h3>Expiring Medicines</h3>
            {alerts.length === 0 ? (
                <Alert variant="success">No medicines expiring soon!</Alert>
            ) : (
                <ListGroup>
                    {alerts.map((medicine) => (
                        <ListGroup.Item key={medicine._id}>
                            <strong>{medicine.name}</strong> is expiring on <em>{new Date(medicine.expiryDate).toDateString()}</em>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default ExpiryAlerts;
