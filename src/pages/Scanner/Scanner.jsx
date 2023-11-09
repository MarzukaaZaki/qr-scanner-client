import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './Scanner.css'
import axios, { Axios } from 'axios';

const Scanner = () => {
    const [data, setData] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const qrCodeRef = useRef();

    const handleQRScan = (qrInfo) => {
        if (qrInfo) {
            const qrText = qrInfo.text
            setData(qrText); // capture content
        }
        // console.log(qrCodeRef.current);
        setTimeout(() => {
            if (qrCodeRef.current) {
                toPng(qrCodeRef.current)
                    .then((dataUrl) => {
                        // console.log(dataUrl);
                        setQrCodeUrl(dataUrl);
                    })
                    .catch((error) => {
                        console.error('Failed to convert SVG to PNG', error);
                    })
            }
        }, 0)

    }

    const getTodayDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const todayDate = getTodayDate();

    const handleSaveInfo = () => {
        const qrCodeInfo = {
            content: data,
            thumbnail: qrCodeUrl,
            scannedOn: todayDate
        };
        // Logic To Save Data in Database
        axios.post('http://localhost:5000/qrcodes', qrCodeInfo)
            .then(response => {
                alert('Data saved successfully')
            })
            .catch(error => {
                alert("Failed to save data!")
            })

    }

    return (
        <div className='qr-reader-container'>
            <div>
                <div style={{ marginBottom:'12px'}}>
                    <small> 1. Open a QR Code Image on your phone
                        <br />2. Hold it directly in front of the camera.
                    </small>
                </div>

                <QrReader
                    className='qr-reader'
                    onResult={handleQRScan}
                />

            </div>

            <div className='qr-info-container'>
                {
                    data ?
                        <>
                            <p><strong>Content:</strong> {data}</p>
                            <div ref={qrCodeRef}>
                                <p><strong>Scanned on:</strong> {todayDate}</p>
                                <p><strong> Thumbnail: </strong></p>
                                <QRCodeSVG
                                    id='qr-code-svg'
                                    bgColor='#FFFFFF'
                                    fgColor='#000000'
                                    style={{ width: 128 }}
                                    value={data}
                                />
                            </div>
                            <button onClick={handleSaveInfo} className='qr-info-save-button'>Save this Information?</button>
                        </>
                        :
                        <p>Your QR Code info will be displayed here...</p>

                }
            </div>


        </div>
    );
};

export default Scanner;