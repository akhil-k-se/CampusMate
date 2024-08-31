import React, {useState} from 'react'
import {useNavigate, NavLink} from 'react-router-dom' 
import Footer from '../footer/footer';
import AdminOrUser from '../adminOrUser/adminOrUser';
import './LandingPage.css';
import '../adminOrUser/adminOrUser.css'
import '../popup.css'
function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
    setIsOpen(false);
    };

    const [buttonPop, setButtonPop] = useState(false)

    return (
        <>
            <nav>
                <div className="nav__bar">
                    <div className="logo">
                        <a href="#"><img src="./nameLogo.jpg" alt="logo" /></a>
                    </div>
                    <div className="nav__menu__btn" id="menu-btn" onClick={handleMenuButtonClick}>
                        <i className="ri-menu-line"></i>
                    </div>
                </div>
                <ul className="nav__links" id="nav-links" onClick={handleNavLinkClick}>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#rooms">Rooms</a></li>
                    <li><a href="#service">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav__btns">
                    <button className="btn nav__btn" onClick={()=> setButtonPop(true)}>Login</button>
                </div>
            </nav>

            <header className="header">
            <div className='black-div' ></div>
                <div className="section__container header__container" id="home">
                    <p>Simple - Unique - Friendly</p>
                    <h1>Make Yourself At Home<br />In Our <span>Hostels</span>.</h1>
                </div>
            </header>

            <section className="section__container about__container" id="about">
                <div className="about__image">
                    <img src="/about.jpg" alt="about" />
                </div>
                <div className="about__content">
                    <p className="section__subheader">ABOUT US</p>
                    <h2 className="section__header">The Second home away from your house!</h2>
                    <p className="section__description">
                        With a focus on quality accommodations, personalized experiences, and
                        seamless booking, our platform is dedicated to ensuring that every
                        traveler embarks on their dream holiday with confidence and
                        excitement.
                    </p>
                    <div className="about__btn">
                        <button className="btn">Read More</button>
                    </div>
                </div>
            </section>

            <section className="section__container room__container" id='rooms'>
                <p className="section__subheader">ROOM OPTIONS AVAILABLE</p>
                <h2 className="section__header">The Most Memorable Stay Time Starts Here.</h2>
                <div className="room__grid">
                    <div className="room__card">
                        <div className="room__card__details">
                            <h4>Common Rooms</h4>
                            <p>
                                4-Seater/3-Seater rooms with common washrooms for the hostellers 
                            </p>
                            <h5>Starting from <span>₹ 60,000/Sem</span></h5>
                        </div>
                    </div>
                    <div className="room__card">
                        <div className="room__card__details">
                            <h4>Standard Rooms</h4>
                            <p>
                                4/3/2-Seater Rooms with personal washroom for the roomates.
                            </p>
                            <h5>Starting from <span>₹ 75,000/Sem</span></h5>
                        </div>
                    </div>
                    <div className="room__card">
                        <div className="room__card__details">
                            <h4>AC-Rooms</h4>
                            <p>
                                4/3/2/1-Seater rooms with personal washroom and air-conditioner facilities.
                            </p>
                            <h5>Starting from <span>₹ 87,499/Sem</span></h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service" id="service">
                <div className="section__container service__container">
                    <div className="service__content">
                        <p className="section__subheader">SERVICES</p>
                        <h2 className="section__header">Strive Only For The Best.</h2>
                        <ul className="service__list">
                            <li>
                                <span><i className="ri-shield-star-line"></i></span>
                                High class Security
                            </li>
                            <li>
                                <span><i className="ri-24-hours-line"></i></span>
                                Well Maintained rooms
                            </li>
                            <li>
                                <span><i className="ri-headphone-line"></i></span>
                                Mess Charges Included
                            </li>
                            <li>
                                <span><i className="ri-map-2-line"></i></span>
                                Laundary Services included
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section__container banner__container">
                <div className="banner__content">
                    <div className="banner__card">
                        <h4>800+</h4>
                        <p>Rooms Available</p>
                    </div>
                    <div className="banner__card">
                        <h4>2000+</h4>
                        <p>Bookings Completed</p>
                    </div>
                    <div className="banner__card">
                        <h4>4.6 *</h4>
                        <p>Ratings</p>
                    </div>
                </div>
            </section>

            <Footer />

            <AdminOrUser trigger={buttonPop}>
                <button className="close_btn" onClick={()=>setButtonPop(false)}>Close</button>
            </AdminOrUser>
        </>
    )
}

export default LandingPage
