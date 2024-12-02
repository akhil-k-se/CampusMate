import React, { useState } from 'react'
import './gateLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function MessSign() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [passwordMatch, setPasswordMatch] = useState(true)

    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate('/account');
    }


    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!passwordMatch) {
            alert("Passwords dont match")
            console.log(formData);
            return
        }
        try {
            const response = await axios.post(
                "http://localhost:3005/gateSecurity/signup",
                formData, {
                withCredentials: true,
            }

            )
            console.log(response);
            alert("User registered successfully !")

            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setPasswordMatch(true);

            console.log('Logged in:', response.data);


        } catch (err) {
            console.log(err);
            const errorMssg =  err.response?.data?.msg || "An error occurred";

            alert(errorMssg);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(() => ({
            ...formData,
            [name]: value,
        }))
        if (name === "password" || name === "confirmPassword") {
            setPasswordMatch(
                name === "password"
                    ? value === formData.confirmPassword : value === formData.password
            )
        }
    }

    return (
        <div className="logMain flex items-center justify-center">

            <div class="logContainer active flex items-center justify-center relative" id="logContainer">
            <button className='absolute top-5 left-5' onClick={handleBack}>Back</button>
                <div className='w-[400px]'>
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" name="name" id='name' onChange={handleChange} value={formData.name} placeholder="Name" />
                        <input type="email" name="email" id='email' onChange={handleChange} value={formData.email} placeholder="Email" />
                        <input type="password" name="password" id='password' onChange={handleChange} value={formData.password} placeholder="Password" />
                        <input type="password" name="confirmPassword" id='confirmPassword' onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default MessSign