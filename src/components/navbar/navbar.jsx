import React from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav>
                    <div class="nav__bar">
                        <div class="logo">
                            <a href="#"><img src="/nameLogo.jpg" alt="logo" /></a>
                        </div>
                        <div class="nav__menu__btn" id="menu-btn">
                            <i class="ri-menu-line"></i>
                        </div>
                    </div>
                    <ul class="nav_links" id="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#service">Services</a></li>
                        <li><a href="#explore">Explore</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <NavLink to="/"><button class="btn nav__btn">Logout</button></NavLink>
                </nav>
        </>
    )
}

export default Navbar
