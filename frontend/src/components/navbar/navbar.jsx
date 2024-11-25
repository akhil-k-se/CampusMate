import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3005/logout",{},{withCredentials:true});

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleQR = () => {
    navigate("/QRcode");
  };
  return (
    <>
      <nav>
        <div className="nav__bar">
          <div className="logo">
            <a href="#">
              <img src="/nameLogo.jpg" alt="logo" />
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav_links" id="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#gatepass">Gatepass</a>
          </li>
          <li>
            <a href="#complaint">Complaint</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a onClick={handleQR}>Your QR</a>
          </li>
        </ul>
        <button className="btn nav__btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;