import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './QRScanner.css'


const QRScanner = () => {
    const [data, setData] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const qrCodeRef = useRef();

    const handleQRScan = (qrInfo) => {
        if (qrInfo) {
            const qrText = qrInfo.text
            setData(qrText); // capture content
        }
        setTimeout(() =>{
            if(qrCodeRef.current){
                toPng(qrCodeRef.current)
                .then((dataUrl)=> {
                    console.log(dataUrl);
                    setQrCodeUrl(dataUrl);
                })
                .catch((error) =>{
                    console.error('Failed to convert SVG to PNG', error);
                })
            }
        }, 0)
 
    }
    
    const getTodayDate = () =>{
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()+1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const todayDate = getTodayDate();
    console.log(todayDate);

    return (
        <div style={{ width:'500px', textAlign:'center'}}>
            <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={handleQRScan}
            />
            
            <div className='qr-reader-container'>
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
                style={{width: 128}}
                value={data}
                /></div>
                
                </>
                :
                <p>Your QR Code info will be displayed here...</p>
                
                }
                {/* <img src={qrCodeUrl}/> */}


            
            </div>


        </div>
    );
};

export default QRScanner;