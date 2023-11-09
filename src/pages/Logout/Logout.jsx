import axios from 'axios';
import React from 'react';

const Logout = () => {
    const handleLogout = async() =>{
        try{
            await axios.post('http://localhost:5000/logout');
            console.log('Logout Successful')
        }
        catch(error){
            console.error('Error logging out:', error)
        }
    }
    return (
        <div>
            <button onClick={handleLogout} style={{ padding:'10px 14px', backgroundColor:'darkslategray'}}>Log Out </button>
        </div>
    );
};

export default Logout;