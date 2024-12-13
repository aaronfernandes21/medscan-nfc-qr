import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-4">Welcome to MedTracker</h1>
                    <p className="lead">Track and manage your medicines effortlessly.</p>
                    {/* Button to navigate to Add Medicine page */}
                    <Button onClick={() => navigate('/add-medicine')} variant="primary" className="mb-3">
                        Add Medicine
                    </Button>
                    {/* Button to navigate to View Medicine List page */}
                    <Button onClick={() => navigate('/medicines')} variant="secondary">
                        View Medicines
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
