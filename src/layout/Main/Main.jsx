import React from 'react';
import { Outlet } from 'react-router-dom';
import './Main.css'

const Main = () => {
    return (
        <div className='container'>
            <Outlet/>
        </div>
    );
};

export default Main;