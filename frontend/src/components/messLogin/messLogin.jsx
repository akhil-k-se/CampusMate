import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../LoginRegister/loginRegister.css'
import axios from 'axios'

function MessLogin() {
    const [formData, setFormData] = useState({
        name: '',  // Changed from name to match backend
        password: '',
        confirmPassword: ''
    })

    const [loginData, setLoginData] = useState({
        name: '',  // Changed from name to match backend
        password: ''
    })

    const navigate = useNavigate()


    const [isActive, setIsActive] = useState(false);

    const makeActive = () => {
        setIsActive(true);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    const [passwordMatch, setPasswordMatch] = useState(true)

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Add more robust password validation
        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Remove confirmPassword before sending to backend
        const { confirmPassword, ...signupData } = formData;
        try {
            const response = await axios.post(
                "http://localhost:3005/mess/signup",
                signupData
            );
            alert("User registered successfully!");
            navigate('/account');
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(() => ({
            ...formData,
            [name]: value,
        }))
        if (name === "password" || name === "confirm_password") {
            setPasswordMatch(
                name === "password"
                    ? value === formData.confirmPassword : value === formData.password
            )
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3005/mess/login",
                loginData
            );
            localStorage.setItem('token', response.data.token);  // Store token
            alert("Login successful!");
            navigate('/account');
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    }

    const handleChangeAgain = (e) => {
        const { name, value } = e.target
        setLoginData(() => ({
            ...loginData,
            [name]: value,
        }))
    }


    return (
        <div className="logMain">
            <div class={isActive ? "logContainer active" : "logContainer"} id="logContainer">
                <div class="form-logContainer sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" name="name" id='name' onChange={handleChange} value={formData.name} placeholder="name" />
                        <input type="password" name="password" id='password' onChange={handleChange} value={formData.password} placeholder="Password" />
                        <input type="password" name="confirmPassword" id='confirmPassword' onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-logContainer sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input type="text" name="name" id='name' onChange={handleChangeAgain} value={loginData.name} placeholder="name" />
                        <input type="password" name="password" id='password' onChange={handleChangeAgain} value={loginData.password} placeholder="Password" />
                        <a href="#">Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="toggle-logContainer">
                    <div class="toggle">
                        <div class="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button class="hider" id="login" onClick={removeActive}>Sign In</button>
                        </div>
                        <div class="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button class="hider" id="register" onClick={makeActive}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessLogin
