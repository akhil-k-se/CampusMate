import React, { useState } from "react";
import Sidebar from "./shared/Sidebar";
import Navbar from "./shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const GateSecurity = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Store form field values in individual state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "role":
        setRole(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const response = await axios.post("https://hostel-sync-1.onrender.com/gatesecurity/signup", {
        name,
        email,
        password,
        confirmPassword
      }, {
        withCredentials: true
      });
      console.log(response.data);
      alert("User Created successfully !")
    } catch (error) {
      const errmsg = error.response?.data?.msg;
      alert(errmsg || "An error occurred.");
    }
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className="w-full h-[91.75vh] bg-[#d2e0ff] flex justify-center items-center">
        <div className="w-[33%] h-[650px] bg-[#9dbaff] rounded-xl ml-[300px] p-6">
          <p className="text-[25px] font-semibold flex items-center justify-center mt-[20px] mb-[40px]">Create Account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <div className="relative mb-5">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-none bg-gray-200"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              />
            </div>

            <div className="relative mb-5">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-none bg-gray-200"
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              />
            </div>

            {error && <p className="text-red-500 mb-5">{error}</p>}

            <div className="mt-4 flex justify-center items-center gap-6">
              <button
                type="submit"
                className="bg-[#2c69f8] text-white p-3 rounded-lg w-[40%] hover:bg-[#4f89e6] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GateSecurity;
