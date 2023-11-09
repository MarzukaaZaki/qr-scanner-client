import React, { useEffect, useState } from 'react';
import './ScanHistory.css'
import axios, { Axios } from 'axios';
import { QRCodeSVG } from 'qrcode.react';
const ScanHistory = () => {
const [scanData, setScanData] = useState([])
const fetchData = () =>{
    axios.get('http://localhost:5000/qrcodes')
            .then(res => {
                setScanData(res.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);

            })
}
    useEffect(() => {
        fetchData();
    }, [])

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:5000/qrcodes/${id}`)
        .then(res =>{
            alert('Entry deleted successfully');
            fetchData();
        })
        .catch(error =>{
            alert('Error deleting entry', error)
        })
        

    }


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

                        <button onClick={() => handleDelete(scanItem.id)} style={{ backgroundColor: 'brown' }}> Delete</button>
                    </div>)

                }
            </div>


        </div>
    );
};

export default ScanHistory;