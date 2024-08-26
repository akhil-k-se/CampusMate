import React , {useState, useEffect}from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {ArrowRightCircle} from 'react-bootstrap-icons'
import '../studentLandingPage/studentLandingPage.css'
import Navbar from '../navbar/navbar'

function StudentLandingPage() {
    const [loopNum, setLoopNum] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const toRotate = ["new beginings", "new friends", "new family"]
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(300-Math.random()*100);
    const period = 100;

    useEffect(()=> {
        let ticker = setInterval(()=> {
            tick();
        }, delta)

        return ()=> {clearInterval(ticker)} 
    }, [text])

    const tick = ()=> {
        let i = loopNum%toRotate.length;
        let fullText = toRotate[i]
        let updatedText = isDeleting ? fullText.substring(0, text.length-1) : fullText.substring(0, text.length + 1)

        setText(updatedText);

        if(isDeleting) {
            setDelta(prevDelta => prevDelta/2)
        }
        if(! isDeleting && updatedText == fullText) {
            setIsDeleting(true)
            setDelta(period)
        } else if(isDeleting && updatedText == '') {
            setIsDeleting(false)
            setLoopNum(loopNum + 1)
            setDelta(500)
        }
    } 

    return (
        <section>
            <Navbar/>
            <Container className='banner' id='home'>
                <div className='black-div' ></div>
                <div className='align-items-center'>
                    <div className='user'>
                        <div className="userImg">
                        <span className='tagline'>Welcome Student<span id='pink-bar'></span>{`User`}</span>
                        <h1>{`Say hi to `}<span className='wrap'>{text}</span></h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate dolores eum accusantium sapiente amet! Rerum cupiditate facilis, voluptates ipsam autem voluptate exercitationem, quos corporis iste eum sequi fugit, placeat saepe.</p>
                        <button className='btn'>View Room</button>
                        </div>
                        <div className="userName">
                        <img src="/154800922.jpeg" alt="" />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </Container>

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
                </div>
                <div class="footer__bar">
                    Copyright © 2023 Web Design Mastery. All rights reserved.
                </div>
            </footer>
        </section>

        
    )
}

export default StudentLandingPage
