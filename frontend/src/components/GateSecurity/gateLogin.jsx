import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './gateLogin.css'
import axios from "axios";

function MessLogin() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/gateSecurity/login",
        loginData,{
          withCredentials:true
        }
      );
      console.log("The response is ",response.data)
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
        class="messContainer active"
        id="messContainer"
      >
      <div className="flex items-center justify-center"><button onClick={handleHomeClick}>Go to Home</button></div>
          <form onSubmit={handleSignIn} className="w-[500px]">
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              id="wmail"
              onChange={handleChangeAgain}
              value={loginData.email}
              placeholder="Email"
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
      </div>
    </div>
  );
}

export default MessLogin;