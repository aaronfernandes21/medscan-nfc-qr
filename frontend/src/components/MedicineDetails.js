// src/components/MedicineDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
        setMedicine(response.data);
      } catch (err) {
        setError('Failed to fetch medicine details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMedicine();
    }
  }, [id]);

  if (loading) return <p className="text-light">Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="mt-5">
      {medicine ? (
        <Row>
          <Col md={6}>
            <Card className="medicine-details-card shadow-lg">
              <Card.Body>
                <Card.Title className="text-center">{medicine.name}</Card.Title>
                <Card.Text>
                  <strong>Expiry Date:</strong> {medicine.expiryDate}
                </Card.Text>
                <Card.Text>
                  <strong>Manufacturing Date:</strong> {medicine.manufacturingDate}
                </Card.Text>
                <Card.Text>
                  <strong>Uses:</strong> {medicine.uses}
                </Card.Text>
                <Card.Text>
                  <img src={medicine.qrCode} alt={`${medicine.name} QR Code`} className="img-fluid" />
                </Card.Text>
                <Button variant="primary" onClick={() => window.history.back()}>
                  Back to List
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p className="text-danger">Medicine not found</p>
      )}
    </Container>
  );
};

export default MedicineDetails;
