import React, {useState,} from 'react'
import './LandingPage.css';
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {NavLink} from 'react-router-dom' 
function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
    setIsOpen(false);
    };

    return (
        <>
            <header class="header">
                <nav>
                    <div class="nav__bar">
                        <div class="logo">
                            <a href="#"><img src="./header.jpg" alt="logo" /></a>
                        </div>
                        <div class="nav__menu__btn" id="menu-btn" onClick={handleMenuButtonClick}>
                            <i class="ri-menu-line"></i>
                        </div>
                    </div>
                    <ul class="nav__links" id="nav-links" onClick={handleNavLinkClick}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#service">Services</a></li>
                        <li><a href="#explore">Explore</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <NavLink to="/signup">
                        <button class="btn nav__btn">Login</button>
                    </NavLink>
                </nav>
                <div class="section__container header__container" id="home">
                    <p>Simple - Unique - Friendly</p>
                    <h1>Make Yourself At Home<br />In Our <span>Hostels</span>.</h1>
                </div>
            </header>

            <section class="section__container about__container" id="about">
                <div class="about__image">
                    <img src="../../assets/Landing/about.jpg" alt="about" />
                </div>
                <div class="about__content">
                    <p class="section__subheader">ABOUT US</p>
                    <h2 class="section__header">The Second home away from your house!</h2>
                    <p class="section__description">
                        With a focus on quality accommodations, personalized experiences, and
                        seamless booking, our platform is dedicated to ensuring that every
                        traveler embarks on their dream holiday with confidence and
                        excitement.
                    </p>
                    <div class="about__btn">
                        <button class="btn">Read More</button>
                    </div>
                </div>
            </section>

            <section class="section__container room__container">
                <p class="section__subheader">OUR LIVING ROOM</p>
                <h2 class="section__header">The Most Memorable Stay Time Starts Here.</h2>
                <div class="room__grid">
                    <div class="room__card">
                        <div class="room__card__image">
                            <div class="room__card__icons">
                                <span><i class="ri-heart-fill"></i></span>
                                <span><i class="ri-paint-fill"></i></span>
                                <span><i class="ri-shield-star-line"></i></span>
                            </div>
                        </div>
                        <div class="room__card__details">
                            <h4>Common Rooms</h4>
                            <p>
                                4-Seater/3-Seater rooms with common washrooms for the hostellers 
                            </p>
                            <h5>Starting from <span>₹ 60,000/Sem</span></h5>
                            <button class="btn">Book Now</button>
                        </div>
                    </div>
                    <div class="room__card">
                        <div class="room__card__image">
                            <div class="room__card__icons">
                                <span><i class="ri-heart-fill"></i></span>
                                <span><i class="ri-paint-fill"></i></span>
                                <span><i class="ri-shield-star-line"></i></span>
                            </div>
                        </div>
                        <div class="room__card__details">
                            <h4>Standard Rooms</h4>
                            <p>
                                4/3/2-Seater Rooms with personal washroom for the roomates.
                            </p>
                            <h5>Starting from <span>₹ 75,000/Sem</span></h5>
                            <button class="btn">Book Now</button>
                        </div>
                    </div>
                    <div class="room__card">
                        <div class="room__card__image">
                            <div class="room__card__icons">
                                <span><i class="ri-heart-fill"></i></span>
                                <span><i class="ri-paint-fill"></i></span>
                                <span><i class="ri-shield-star-line"></i></span>
                            </div>
                        </div>
                        <div class="room__card__details">
                            <h4>AC-Rooms</h4>
                            <p>
                                4/3/2/1-Seater rooms with personal washroom and air-conditioner facilities.
                            </p>
                            <h5>Starting from <span>₹ 87,499/Sem</span></h5>
                            <button class="btn">Book Now</button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="service" id="service">
                <div class="section__container service__container">
                    <div class="service__content">
                        <p class="section__subheader">SERVICES</p>
                        <h2 class="section__header">Strive Only For The Best.</h2>
                        <ul class="service__list">
                            <li>
                                <span><i class="ri-shield-star-line"></i></span>
                                High Class Security
                            </li>
                            <li>
                                <span><i class="ri-24-hours-line"></i></span>
                                Well Maintained rooms
                            </li>
                            <li>
                                <span><i class="ri-headphone-line"></i></span>
                                Mess Charges Included
                            </li>
                            <li>
                                <span><i class="ri-map-2-line"></i></span>
                                Laundary Services included
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="section__container banner__container">
                <div class="banner__content">
                    <div class="banner__card">
                        <h4>800+</h4>
                        <p>Rooms Available</p>
                    </div>
                    <div class="banner__card">
                        <h4>2000+</h4>
                        <p>Bookings Completed</p>
                    </div>
                    <div class="banner__card">
                        <h4>4.6 *</h4>
                        <p>Ratings</p>
                    </div>
                </div>
            </section>

            <section class="explore" id="explore">
                <p class="section__subheader">EXPLORE</p>
                <h2 class="section__header">What's New Today.</h2>
                <div class="explore__bg">
                    <div class="explore__content">
                        <p class="section__description">10th AUG 2024</p>
                        <h4>A New Mess Menu Is Available In Our Hostels.</h4>
                        <button class="btn">View Menu</button>
                    </div>
                </div>
            </section>

            <footer class="footer" id="contact">
                <div class="section__container footer__container">
                    <div class="footer__col">
                        <div class="logo">
                            <a href="#home"><img src="../../assets/Landing/logo.png" alt="logo" /></a>
                        </div>
                        <p class="section__description">
                            Discover a world of comfort, luxury, and adventure as you explore
                            our curated selection of hotels, making every moment of your getaway
                            truly extraordinary.
                        </p>
                        <button class="btn">Book Now</button>
                    </div>
                    <div class="footer__col">
                        <h4>QUICK LINKS</h4>
                        <ul class="footer__links">
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">My Reservation</a></li>
                            <li><a href="#">View Rooms</a></li>
                            <li><a href="#">Manage Profile</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4>OUR SERVICES</h4>
                        <ul class="footer__links">
                            <li><a href="#">Complaints</a></li>
                            <li><a href="#">Feedback & Help</a></li>
                            <li><a href="#">Mess Card</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4>CONTACT US</h4>
                        <ul class="footer__links">
                            <li><a href="#">rayalpark@info.com</a></li>
                        </ul>
                        <div class="footer__socials">
                            <a href="#"><FaInstagram/></a>
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaEnvelope/></a>
                            <a href="#"><FaTwitter/></a>
                        </div>
                    </div>
                </div>
                <div class="footer__bar">
                    Copyright © 2023 Web Design Mastery. All rights reserved.
                </div>
            </footer>
        </>
    )
}

export default LandingPage
