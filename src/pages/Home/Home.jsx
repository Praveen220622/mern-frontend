import React, { useEffect, useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../util';
import { ToastContainer } from 'react-toastify'

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(user);
        }
    }, []);
    const handleLogout = (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess("User Loggedout")
        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }

    return (
        <>
            <div className='container'>
                <h1 className='heading'>{loggedInUser ? `Welcome, ${loggedInUser}!` : 'Welcome, Guest!'}</h1>
                <button className='logout-button' onClick={handleLogout}>Logout</button>

            </div>
            <div className='shop-container'>
                <h1>Start Your Shopping from Here..!</h1>
                <a href='https://ecommercewebsite-rho.vercel.app/'><buttton className="btn">Shop Now</buttton></a>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
