import React, { useEffect, useState } from 'react';
import './ScanHistory.css'
import axios, { Axios } from 'axios';
import { QRCodeSVG } from 'qrcode.react';
const ScanHistory = () => {
    const [scanData, setScanData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/qrcodes')
            .then(res => {
                setScanData(res.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);

            })
    })


    return (
        <div>
            <div className='scan-history-heading'>
                <hr />
                <p style={{ color: 'gray' }}> Scan History</p>
                <hr />
            </div>

            <div className='scan-history-container'>
                {
                    scanData.map((scanItem, index) => <div className='scan-history-card' key={index}>
                        <div>
                            <p><strong>{scanItem.content}</strong></p>
                            <p style={{ color: 'grey' }}>Scanned On: {scanItem.scanned_date}</p>
                            <QRCodeSVG value={scanItem.content} />
                        </div>

                        <button style={{ backgroundColor: 'brown' }}> Delete</button>
                    </div>)

                }
            </div>


        </div>
    );
};

export default ScanHistory;