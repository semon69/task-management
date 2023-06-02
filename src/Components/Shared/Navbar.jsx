import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogout = () => {
        logOut()
            .then(() => { })
    }
    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-24 font-bold'>
                <p><NavLink className={({ isActive }) => isActive ? "text-green-500" : ''} to='/'>Home</NavLink></p>
                <p><NavLink className={({ isActive }) => isActive ? "text-green-500" : ''} to='/allTask'>All Task</NavLink></p>
                <p><NavLink className={({ isActive }) => isActive ? "text-green-500" : ''} to='/addTask'>Add Task</NavLink></p>
            </div>
            <div className='flex gap-10'>
                {
                    user ?
                        <>
                            <button onClick={handleLogout} className='btn btn-primary mt-3'>Log Out</button>
                            <p><img title={user?.displayName} className='rounded-full w-16' src={user?.photoURL} alt="Image" /></p>
                        </>

                        :
                        <>
                            <button className='btn btn-primary'><NavLink to='/login'>Login</NavLink></button>
                        </>

                }

            </div>
        </div>
    );
};

export default Navbar;