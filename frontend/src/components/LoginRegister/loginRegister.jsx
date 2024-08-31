import React, { useState } from 'react'
import './loginRegister.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function RegisterLogin() {
    const [formData , setFormData] = useState({
        name :'',
        email :'',
        password : '',
        confirmPassword:'',
        enrollmentID : ''
    })

    const [passwordMatch, setPasswordMatch] = useState(true)

    const navigate = useNavigate()
    const handleClick = ()=> {
        console.log("clicked");
        
        navigate("/user");
    }

    const [isActive, setIsActive] = useState(false);

    const makeActive = () => {
        setIsActive(true);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    const handleSignUp = async(e)=> {
        e.preventDefault()
        if(!passwordMatch) {
            alert("Passwords dont match")
            console.log(formData); 
        }
        try {
            const response = await axios.post(
                "http://localhost:3005/register/student",
                formData
            )
            console.log(response);
            alert("User registered successfully !")
        } catch(e) {
            console.log(e);
            
            alert ("error !")
        }
    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setFormData(()=> ({
            ...formData,
            [name]: value,
        }))
        if(name === "password" || name === "confirm_password") {
            setPasswordMatch (
                name === "password"
                ? value === formData.confirmPassword : value === formData.password
            )
        }
    }
    
    const [loginData, setLoginData] = useState({
        enrollmentID : '',
        password: ''
    })

    const handleSignIn = async(e)=> {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:3005/login/student",
                loginData
            )
            console.log(response);
            alert("Login successfull !")
        } catch(e) {
            console.log(e);
            
            alert ("error !")
        }
    }

    const handleChangeAgain = (e)=> {
        const {name, value} = e.target
        setLoginData(()=> ({
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
                        <input type="text" name ="name" id='name' onChange={handleChange} value={formData.name} placeholder="Name" />
                        <input type='number'name ="enrollmentID" id='enrollmentID' onChange={handleChange} value={formData.enrollmentID} placeholder='Enrollment ID'/>
                        <input type="email" name ="email" id='email' onChange={handleChange} value={formData.email} placeholder="Email" />
                        <input type="password" name ="password" id='password' onChange={handleChange} value={formData.password} placeholder="Password" />
                        <input type="password" name ="confirm_password" id='confirm_password' onChange={handleChange} value={formData.confirm_password} placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-logContainer sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input type="number" name ="enrollmentID" id='enrollmentID' onChange={handleChangeAgain} value={loginData.enrollmentID} placeholder="Enrollment ID"/>
                            <input type="password" name ="password" id='password' onChange={handleChangeAgain} value={loginData.password} placeholder="Password"/>
                                <a href="#">Forget Your Password?</a>
                                <button onClick={handleClick}>Sign In</button>
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
export default RegisterLogin
