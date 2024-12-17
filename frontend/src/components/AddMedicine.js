import React, { useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const AddMedicine = () => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uses, setUses] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // For modal feedback

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://witty-actors-taste.loca.lt/api/medicines', {
                name,
                expiryDate,
                uses,
                manufacturingDate,
            });

            const medicineId = response.data._id;
            const medicineUrl = `https://witty-actors-taste.loca.lt/api/medicines/${medicineId}`;

            // Generate QR code
            const qr = await QRCode.toDataURL(medicineUrl);
            setQrCode(qr);

            // Reset form fields
            setName('');
            setExpiryDate('');
            setUses('');
            setManufacturingDate('');
            setSuccessMessage('Medicine successfully added!');
            setIsLoading(false);

            // Show the success modal
            setShowModal(true);

        } catch (err) {
            setIsLoading(false);
            setError('Failed to add medicine');
            setSuccessMessage('');
        }
    };

    // Close the modal
    const handleClose = () => setShowModal(false);

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
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" /> // Loading spinner
                            ) : (
                                'Add Medicine'
                            )}
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

                    {qrCode && (
                        <div className="text-center mt-4">
                            <h3>Generated QR Code</h3>
                            <img src={qrCode} alt="Medicine QR Code" className="img-fluid" />
                            <p className="mt-2">
                                <a href={qrCode} download="medicine-qr-code.png">
                                    Download QR Code
                                </a>
                            </p>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Medicine Added Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your medicine has been successfully added, and the QR code has been generated.</p>
                    <img src={qrCode} alt="Medicine QR Code" className="img-fluid" />
                    <p>
                        <a href={qrCode} download="medicine-qr-code.png">Download QR Code</a>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AddMedicine;
