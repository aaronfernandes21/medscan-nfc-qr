// src/components/MedicineList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medicines');
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-light">Medicines List</h2>
      <Row>
        {medicines.length === 0 ? (
          <p>No medicines available</p>
        ) : (
          medicines.map(medicine => (
            <Col md={4} key={medicine._id} className="mb-4">
              <Card className="medicine-card shadow-lg">
                <Card.Body>
                  <Card.Title>{medicine.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Expiry Date: {medicine.expiryDate}</Card.Subtitle>
                  <Card.Text>{medicine.uses}</Card.Text>
                  <Link to={`/medicine/${medicine._id}`}>
                    <Button variant="outline-primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default MedicineList;
