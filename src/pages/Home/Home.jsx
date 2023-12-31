import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import ScanHistory from '../../components/ScanHistory/ScanHistory';
const Home = () => {
    return (
        <div className='scanner-container'>
            <h1> Welcome to QR Scanner</h1>
            <p style={{color:'gray'}}> To begin, click the button below !</p>
           <Link to='/scanner' className='start-scan-button'> Start Scanning </Link>
           <ScanHistory/>
        </div>
    );
};

export default Home;