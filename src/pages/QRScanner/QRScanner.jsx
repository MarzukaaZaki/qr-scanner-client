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
    const handleError = (error) => {
        console.error(error);
    };

    return (
        <div style={{ width:'500px', textAlign:'center'}}>
            <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={handleQRScan}
                

            />
            
            <div className='qr-reader-container' style={{ border: '2px solid black',  borderRadius:'10px', padding:'10px 25px'}}>
                {
                data ?     
                <>
                <p><strong>Content:</strong> {data}</p>
                <div ref={qrCodeRef}>
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