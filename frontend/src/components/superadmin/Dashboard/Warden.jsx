import React, { useState } from "react";
import Sidebar from "./shared/Sidebar";
import Navbar from "./shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Warden = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    hostel: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null); // Separate state for the image file
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("hostel", formData.hostel);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (image) {
      formDataToSend.append("image", image); // Append the image file
    }

    try {
      const response = await axios.post("http://localhost:3005/admin/signup", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        alert("User created successfully!");
      } else {
        alert(response.data.message || "Failed to create user.");
      }
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
          <p className="text-[25px] font-semibold flex items-center justify-center mt-[20px] mb-[40px]">
            Create Account
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <input
              type="text"
              name="hostel"
              placeholder="Hostel"
              value={formData.hostel}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-200"
            />

            <div className="relative mb-5">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
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
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-none bg-gray-200"
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              />
            </div>

            <div className="mb-5">
              <input
                type="file"
                name="image"
                onChange={handleImageChange} // Handle image change
                className="w-full p-3 rounded-lg border-none bg-gray-200"
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

export default Warden;
