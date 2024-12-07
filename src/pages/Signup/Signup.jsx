import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import Headers from '../Headers/Headers'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        const copysignupInfo = { ...signupInfo }
        copysignupInfo[name] = value
        setSignupInfo(copysignupInfo)
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name,email and Password are required')
        }
        try {
            const url = "https://mern-backend-akgp.onrender.com/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message
                handleError(details)
            } else if (!success) {
                handleError(message)
            }
        } catch (err) {
            handleError(err)
        }
    }
    return (
        <>
            <Headers />
            <div className="outer-container">

                <div className='container1'>
                    <div className='image-container'>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--login-user-signup-create-account-log-pack-business-illustrations-9472344.png" alt="signup-image" className='image' />
                    </div>
                    <div className="paragraph-container">
                        <h1>Sign up to</h1>
                        <h2>Lorem Ipsum is simply</h2>
                        <h5>If you had an account
                            <Link to='/login'>
                                <span className='span-element'> Login Here!</span>
                            </Link>
                        </h5>
                    </div>
                </div>
                <div className="container2">
                    <form onSubmit={handleSignup}>
                        <div className="form-container">
                            <div className='inputs-container'>
                                <label htmlFor='name' className='Input-Type' >Name</label><br />
                                <input type="text" onChange={handleChange} className="inputs-value" name="name" placeholder='Enter Your Name...' value={signupInfo.name} />
                            </div>
                            <div className='inputs-container'>
                                <label htmlFor='name' className='Input-Type'>Email</label><br />
                                <input type="email" onChange={handleChange} className="inputs-value" name="email" placeholder='Enter Your Email...' value={signupInfo.email} />
                            </div>
                            <div className='inputs-container'>
                                <label htmlFor='name' className='Input-Type' >Password</label><br />
                                <input type="password" onChange={handleChange} className="inputs-value" name="password" placeholder='Enter Your Password...' value={signupInfo.password} />
                            </div>
                            <div className="">
                                <button type="submit" className='button'>SignUp</button>

                            </div>
                        </div>
                    </form>
                    <ToastContainer />
                </div>

            </div >

        </>
    )
}

export default Signup
