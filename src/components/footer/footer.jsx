import React from 'react'
import './footer.css'
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer class="footer" id="contact">
                <div class="section__container footer__container">
                    {/* <div class="footer__col">
                        <div class="logo">
                            <a href="#home"><img src="/nameLogo.jpg" alt="logo" /></a>
                        </div>
                        <p class="section__description">
                            Discover a world of comfort, luxury, and adventure as you explore
                            our curated selection of hotels, making every moment of your getaway
                            truly extraordinary.
                        </p>
                        <button class="btn">Book Now</button>
                    </div> */}
                    {/* <span className='footer_divider'></span> */}
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
                            <li><a href="#">hostelsync@info.com</a></li>
                        </ul>
                        <div class="footer__socials">
                            <a href="#"><img src="/instagram.png" alt="insta" /></a>
                            <a href="#"><img src="/facebook.png" alt="" /></a>
                            <a href="#"><img src="/twitter.png" alt="" /></a>
                            <a href="#"><img src="/youtube.png" alt="" /></a>
                        </div>
                    </div>
                </div>
                <div class="footer__bar">
                    Copyright © 2023 Web Design Mastery. All rights reserved.
                </div>
            </footer>
    )
}

export default Footer
