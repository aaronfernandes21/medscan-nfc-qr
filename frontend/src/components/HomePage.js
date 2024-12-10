// src/components/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/medicines');
    }, 3000);
  }, [navigate]);

  return (
    <div className="home-page">
      <Container className="text-center mt-5">
        <Row>
          <Col>
            <h1 className="display-4 text-primary">Welcome to MedTracker</h1>
            <p className="lead text-light">Track and manage your medicines effortlessly.</p>
            <Button variant="primary" onClick={() => navigate('/medicines')}>Go to Medicines</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
