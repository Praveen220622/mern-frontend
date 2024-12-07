import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
import { useNavigate, } from 'react-router-dom'
import { useState } from 'react'
import './Login.css'
import Headers from '../Headers/Headers'
const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        const copyloginInfo = { ...loginInfo }
        copyloginInfo[name] = value
        setLoginInfo(copyloginInfo)
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and Password are required')
        }
        try {
            const url = "https://mern-backend-akgp.onrender.com/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json()
            const { success, message, jwtoken, name, error } = result;
            if (success) {
                handleSuccess(message)
                localStorage.setItem('token', jwtoken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details?.[0]?.message || message
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
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--select-an-account-join-the-forum-password-digital-marketing-pack-business-illustrations-8333958.png?f=webp" alt="signup-image" className='image' />
                    </div>
                    <div className="paragraph-container">
                        <h1>Sign up to</h1>
                        <h2>Lorem Ipsum is simply</h2>
                        <h5>If  you didn't have an account
                            <Link to="/">
                                <span className='span-element'>
                                    SignUp Here..!</span>
                            </Link>
                        </h5>
                    </div>
                </div>
                <div className="container2">
                    <form onSubmit={handleLogin}>
                        <div className="form-container">

                            <div className='inputs-container'>
                                <label htmlFor='name' className='Input-Type'>Email</label><br />
                                <input type="email" onChange={handleChange} className="inputs-value" name="email" placeholder='Enter Your Email...' value={loginInfo.email} />
                            </div>
                            <div className='inputs-container'>
                                <label htmlFor='name' className='Input-Type' >Password</label><br />
                                <input type="password" onChange={handleChange} className="inputs-value" name="password" placeholder='Enter Your Password...' value={loginInfo.password} />
                            </div>
                            <div className="">
                                <button type="submit" className='button'>Login</button>

                            </div>
                        </div>
                    </form>
                    <ToastContainer />
                </div>

            </div >

        </>
    )
}

export default Login
