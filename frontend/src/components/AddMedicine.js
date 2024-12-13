import React, { useState } from 'react';
import QRCode from 'qrcode'; // Import the QR code library
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const AddMedicine = () => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uses, setUses] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [qrCode, setQrCode] = useState(''); // Store the generated QR code
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update the URL to use localtunnel's public URL
            const response = await axios.post('https://witty-actors-taste.loca.lt/api/medicines', {
                name,
                expiryDate,
                uses,
                manufacturingDate,
            });

            const medicineId = response.data._id; // Get the newly created medicine ID
            const medicineUrl = `https://witty-actors-taste.loca.lt/api/medicines/${medicineId}`; // Create the URL

            // Generate QR code
            const qr = await QRCode.toDataURL(medicineUrl);
            setQrCode(qr);

            // Reset form fields
            setName('');
            setExpiryDate('');
            setUses('');
            setManufacturingDate('');
            setError('');
            setSuccessMessage('Medicine successfully added!');
        } catch (err) {
            console.error('Error adding medicine:', err);
            setError('Failed to add medicine');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <h1 className="text-center mb-4">Add New Medicine</h1>

                    <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                        <Form.Group controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter medicine name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formExpiryDate" className="mt-3">
                            <Form.Label>Expiry Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formUses" className="mt-3">
                            <Form.Label>Uses:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter uses of the medicine"
                                value={uses}
                                onChange={(e) => setUses(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formManufacturingDate" className="mt-3">
                            <Form.Label>Manufacturing Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={manufacturingDate}
                                onChange={(e) => setManufacturingDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-4"
                        >
                            Add Medicine
                        </Button>
                    </Form>

                    {successMessage && (
                        <Alert variant="success" className="mt-4">
                            {successMessage}
                        </Alert>
                    )}

                    {error && (
                        <Alert variant="danger" className="mt-4">
                            {error}
                        </Alert>
                    )}

                    {/* Display QR code */}
                    {qrCode && (
                        <div className="text-center mt-4">
                            <h3>Generated QR Code</h3>
                            <img src={qrCode} alt="Medicine QR Code" />
                            <p className="mt-2">
                                <a href={qrCode} download="medicine-qr-code.png">
                                    Download QR Code
                                </a>
                            </p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AddMedicine;
