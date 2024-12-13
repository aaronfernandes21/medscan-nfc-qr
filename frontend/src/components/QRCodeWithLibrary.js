import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeWithLibrary = ({ value }) => {
    const [qrCode, setQRCode] = useState('');

    useEffect(() => {
        // Generate QR code as a Data URL
        QRCode.toDataURL(value, { width: 150 }) // Customize width if needed
            .then((url) => setQRCode(url))
            .catch((err) => console.error('Error generating QR Code:', err));
    }, [value]);

    return (
        <div>
            <h3>Generated QR Code</h3>
            {qrCode ? <img src={qrCode} alt="QR Code" /> : <p>Generating QR Code...</p>}
        </div>
    );
};

export default QRCodeWithLibrary;
