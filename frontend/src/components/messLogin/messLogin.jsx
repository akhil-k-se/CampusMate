import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../messLogin/messLogin.css'
import axios from "axios";

function MessLogin() {
  const [formData, setFormData] = useState({
    name: "", // Changed from name to match backend
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    name: "", // Changed from name to match backend
    password: "",
  });

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const makeActive = () => {
    setIsActive(true);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

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
        signupData,{
          withCredentials:true
        }
      );
      alert("User registered successfully!");
      navigate("/qrscanner");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
    if (name === "password" || name === "confirm_password") {
      setPasswordMatch(
        name === "password"
          ? value === formData.confirmPassword
          : value === formData.password
      );
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/mess/login",
        loginData,{
          withCredentials:true
        }
      );
      localStorage.setItem("token", response.data.token); // Store token
      alert("Login successful!");
      navigate("/qrscanner");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleHomeClick=()=>{
    navigate("/");
  }

  const handleChangeAgain = (e) => {
    const { name, value } = e.target;
    setLoginData(() => ({
      ...loginData,
      [name]: value,
    }));
  };

  return (
    <div className="logMain">
      <div
        class={isActive ? "messContainer active " : "messContainer"}
        id="messContainer"
      >
      <div className="flex items-center justify-center"><button onClick={handleHomeClick}>Go to Home</button></div>
        {/* <div class="form-messContainer sign-in"> */}
          <form onSubmit={handleSignIn} className="w-[500px]">
            <h1>Sign In</h1>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChangeAgain}
              value={loginData.name}
              placeholder="name"
            />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChangeAgain}
              value={loginData.password}
              placeholder="Password"
            />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        {/* </div> */}
        <div class="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button class="hider" id="login" onClick={removeActive}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessLogin;
