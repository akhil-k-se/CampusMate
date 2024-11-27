import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import '../studentLandingPage/studentLandingPage.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Bookings from '../booking/booking';
import '../repeatPop.css';
import Gatepass from '../gatepass/gatepass';
import Complaint from '../complaint/complaint';
import { BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';

function StudentLandingPage() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["beginnings", "friends", "family"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 100;

    const [userData, setUserData] = useState(null);
    const [isRoomBooked, setIsRoomBooked] = useState(false); // State for room booking status
    const navigate = useNavigate();

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker); };
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    };

    function handlePopBook() {
        const forms = document.getElementsByClassName("popBook");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(1)';
        }
    }

    const getUserData = async () => {
        try {
            const response = await axios.get("http://localhost:3005/student/showdata", {
                withCredentials: true, // Include credentials for cookies
            });
            setUserData(response.data.user.name); // Set the user name
        } catch (err) {
            console.error(err);
        }
    };

    const checkRoomBookingStatus = async () => {
        try {
            const response = await axios.get("http://localhost:3005/student/isBooked", {
                withCredentials: true, // Include credentials for cookies
            });
            setIsRoomBooked(response.data.isRoomBooked);
            console.log(response.data.isRoomBooked) // Update booking status
        } catch (err) {
            console.error("Error fetching room booking status:", err);
        }
    };

    // Fetch user data and room booking status on page load
    useEffect(() => {
        getUserData();
        checkRoomBookingStatus();
    }, []);

    return (
        <div>
            <section className="main_page">
                <Navbar />
                <Container className='banner' id='home'>
                    <div className='black-div'></div>
                    <div className='align-items-center'>
                        <div className='user'>
                            <div className="userImg">
                                <span className='tagline'>Welcome Student<span id='pink-bar'></span> {userData}</span>
                                <h1>{`New `}<span className='wrap'>{text}</span></h1>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate dolores eum accusantium sapiente amet! Rerum cupiditate facilis, voluptates ipsam autem voluptate exercitationem, quos corporis iste eum sequi fugit, placeat saepe.</p>
                                {!isRoomBooked && ( // Conditionally display the button
                                    <button onClick={handlePopBook} className='btn'>Book Room</button>
                                )}
                            </div>

                            <div className="userName">
                                <div className='img_holder'>
                                    <div className="over_user"><NavLink to="/user/profile"><BsFillPencilFill /></NavLink></div>
                                    <img src="/profile.webp" alt="" ></img>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </Container>

                <section className="section__container about__container" id="gatepass">
                    <div className="about__content">
                        <p className="section__subheader">GATEPASS</p>
                        <h2 className="section__header">Ticket to go out of the Campus</h2>
                        <p className="section__description">
                            With a focus on quality accommodations, personalized experiences, and
                            seamless booking, our platform is dedicated to ensuring that every
                            traveler embarks on their dream holiday with confidence and
                            excitement.
                        </p>
                        <div className="about__btn">
                            <button className="btn" onClick={handlePopBook}>Apply Gatepass</button>
                        </div>
                    </div>
                    <div className="about__image">
                        <img src="/9557011.jpg" alt="about" />
                    </div>
                </section>

                <Footer page='subpage' />
            </section>

            <div className="popForm popBook scale-0">
                <Bookings />
            </div>
        </div>
    );
}

export default StudentLandingPage;
