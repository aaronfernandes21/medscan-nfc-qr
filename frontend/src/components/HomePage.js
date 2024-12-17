import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            {/* Header Section */}
            <Row className="mb-4">
                <Col>
                    <div
                        style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '15px',
                            padding: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h1 className="display-4" style={{ fontWeight: 'bold' }}>
                            Welcome to MedTracker
                        </h1>
                        <p className="lead">
                            Track and manage your medicines effortlessly. Stay healthy, stay informed.
                        </p>
                    </div>
                </Col>
            </Row>

            {/* Feature Section with Circular Shapes */}
            <Row className="align-items-center mb-5">
                <Col md={6} className="text-center">
                    <div
                        style={{
                            width: '250px',
                            height: '250px',
                            backgroundColor: '#007bff',
                            borderRadius: '50%',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Add Medicine
                    </div>
                    <p className="mt-3">
                        Easily add your medicine details and generate a QR code for tracking.
                    </p>
                    <Button
                        onClick={() => navigate('/add-medicine')}
                        variant="primary"
                        className="mt-2"
                    >
                        Go to Add Medicine
                    </Button>
                </Col>
                <Col md={6} className="text-center">
                    <div
                        style={{
                            width: '250px',
                            height: '250px',
                            backgroundColor: '#6c757d',
                            borderRadius: '50%',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        View Medicines
                    </div>
                    <p className="mt-3">
                        View all added medicines and get alerts for expiry dates.
                    </p>
                    <Button
                        onClick={() => navigate('/medicines')}
                        variant="secondary"
                        className="mt-2"
                    >
                        Go to Medicines
                    </Button>
                </Col>
            </Row>

            {/* Call-to-Action Section */}
            <Row className="mt-5">
                <Col>
                    <Card
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        className="p-4"
                    >
                        <Card.Body>
                            <h2>Get Started Now</h2>
                            <p>Start managing your medicines today for a healthier tomorrow.</p>
                            <Button
                                onClick={() => navigate('/add-medicine')}
                                variant="success"
                                className="me-3"
                            >
                                Add Medicine
                            </Button>
                            <Button onClick={() => navigate('/medicines')} variant="info">
                                View Medicines
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
