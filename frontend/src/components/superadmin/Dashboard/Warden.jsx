import React, { useState } from "react";
import Sidebar from "./shared/Sidebar";
import Navbar from "./shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Warden = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const hostelNames = {
    Female: ["IBN-A", "IBN-B", "IBN-C", "Pie-A", "Pie-B", "Pie-C", "Nightingale-A", "Nightingale-B", "Vasco"],
    Male: ["Colambus", "Armstrong", "Franklin", "Marco Polo"],
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    hostel: "",
    role: "",
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
    formDataToSend.append("email", formData.email);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("hostel", formData.hostel);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("password", formData.password);
    if (image) {
      formDataToSend.append("image", image); // Append the image file
    }

    try {
      const response = await axios.post("https://campus-mate.onrender.com/admin/signup", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(response.data.message || "Failed to create user.", {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                      });
      }
    } catch (error) {
      const errmsg = error.response?.data?.msg;
      toast.error(errmsg || "An error occurred.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    }
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className="w-full h-[91.75vh] bg-gray-800 flex justify-center items-center">
      <ToastContainer />
        <div className="w-[33%] h-[675px] bg-gray-900 rounded-xl ml-[300px] p-6">
          <p className="text-[25px] font-extrabold text-blue-500 flex items-center justify-center mt-[20px] mb-[40px]">
            Create Account
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
            />
            <select
              name="gender"
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
              type="text"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            <select
              name="hostel"
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
              type="text"
              placeholder="Hostel"
              value={formData.hostel}
              onChange={handleChange}
              required
            >
              <option value="">Select Hostel</option>
              {hostelNames[formData.gender]?.map(
                (hostel, index) => (
                  <option key={index} value={hostel}>
                    {hostel}
                  </option>
                )
              )}
            </select>

            <select
              name="role"
              className="mb-5 w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Role">Role</option>
              <option value="Warden">Warden</option>
              <option value="Assistant Warden">Assistant Warden</option>
            </select>


            <div className="relative mb-5">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
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
                className="w-full p-3 rounded-lg border-none bg-gray-800 text-stone-400"
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
                className="w-full p-3 rounded-lg border-none bg-gray-800 text-gray-400"
              />
            </div>

            {error && <p className="text-red-500 mb-5">{error}</p>}

            <div className="mt-4 flex justify-center items-center gap-6">
              <button
                type="submit"
                className="bg-[#3879e2] text-white p-3 rounded-lg w-[40%] hover:bg-[#2c69f8] transition duration-300 ease-in-out transform hover:scale-105"
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
