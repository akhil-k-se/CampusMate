import React, { useState } from 'react'
import './loginRegister.css'
import {FaEnvelope, FaLock, FaUser} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function LoginRegister() {
    const[action, setAction] = useState('')

    const registerLink = ()=> {
        setAction('active')
    }

    const loginLink = ()=> {
        setAction('')
    }

    return (
        <div className='box'>
            <div className={`wrapper ${action}`}>
            <div className="form-box login">
                
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot Password ?</a>
                    </div>
                    <NavLink to="/user">
                        <button type="submit">Login</button>
                    </NavLink>

                    <div className="register-link">
                        <p>Don't have an account ? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='E-mail' required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/>I agree to Terms & Conditions</label>
                    </div>
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Already have an account ? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default LoginRegister
