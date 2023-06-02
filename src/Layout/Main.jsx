import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='max-w-7xl mx-auto my-8'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;