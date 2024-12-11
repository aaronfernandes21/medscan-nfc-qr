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
                    <Button onClick={() => navigate('/add-medicine')} variant="primary">
                        Add Medicine
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
