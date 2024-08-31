import React , {useState, useEffect}from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {useNavigate, NavLink } from 'react-router-dom'
import '../studentLandingPage/studentLandingPage.css'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import Bookings from '../booking/booking'
import '../repeatPop.css'
import Gatepass from '../gatepass/gatepass'
import Complaint from '../complaint/complaint'
import { BsFillPencilFill } from "react-icons/bs";

function StudentLandingPage() {
    const [loopNum, setLoopNum] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const toRotate = ["beginnings", "friends", "family"]
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(300-Math.random()*100);
    const period = 100;

    const navigate = useNavigate()

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

    function handlePopBook(){
        const forms = document.getElementsByClassName("popBook");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(1)';
        }    
    }
    function handlePopGate(){
        const forms = document.getElementsByClassName("popGate");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(1)';
        }    
    }
    function handlePopComplaint(){
        const forms = document.getElementsByClassName("popComplaint");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(1)';
        }    
    }


    const [popedUp, setPopedUp] = useState(true)

    return (
        <div>
            <section className="main_page">
            <Navbar/>
            <Container className='banner' id='home'>
                <div className='black-div' ></div>
                <div className='align-items-center'>
                    <div className='user'>
                        <div className="userImg">
                        <span className='tagline'>Welcome Student<span id='pink-bar'></span>{`Guest12345`}</span>
                        <h1>{`New `}<span className='wrap'>{text}</span></h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate dolores eum accusantium sapiente amet! Rerum cupiditate facilis, voluptates ipsam autem voluptate exercitationem, quos corporis iste eum sequi fugit, placeat saepe.</p>
                        <button onClick={handlePopBook} className='btn'>Book Room</button>
                        </div>

                        <div className="userName">
                            <div className='img_holder'>
                                <div className="over_user"><NavLink to="/user/profile"><BsFillPencilFill/></NavLink></div>
                                <img src="/profile.webp" alt="" ></img>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </Container>

            <section class="section__container about__container" id="gatepass">
                <div class="about__content">
                    <p class="section__subheader">GATEPASS</p>
                    <h2 class="section__header">Ticket to go out of the Campus</h2>
                    <p class="section__description">
                        With a focus on quality accommodations, personalized experiences, and
                        seamless booking, our platform is dedicated to ensuring that every
                        traveler embarks on their dream holiday with confidence and
                        excitement.
                    </p>
                    <div class="about__btn">
                        <button class="btn" onClick={handlePopGate}>Apply Gatepass</button>
                    </div>
                </div>
                <div class="about__image">
                    <img src="/9557011.jpg" alt="about" />
                </div>
            </section>
            
            <section class="section__container about__container" id="complaint">
                <div class="about__image">
                    <img src="/complaint.jpg" alt="about" />
                </div>
                <div class="about__content">
                    <p class="section__subheader">COMPLAINTS</p>
                    <h2 class="section__header">Nothing goes unheard !</h2>
                    <p class="section__description">
                        With a focus on quality accommodations, personalized experiences, and
                        seamless booking, our platform is dedicated to ensuring that every
                        traveler embarks on their dream holiday with confidence and
                        excitement.
                    </p>
                    <div class="about__btn">
                        <button class="btn" onClick={handlePopComplaint}>Raise a complaint</button>
                    </div>
                </div>
            </section>

            <section class="explore" id="explore">
                <p class="section__subheader">EXPLORE</p>
                <h2 class="section__header">What's New Today.</h2>
                <div class="explore__bg">
                    <div className='black-div'></div>
                    <div class="explore__content">
                        <p class="section__description">10th AUG 2024</p>
                        <h4>A New Mess Menu Is Available In Our Hostels.</h4>
                        <NavLink to='/mess'>
                            <button class="btn">View Menu</button>
                        </NavLink>
                    </div>
                </div>
            </section>

            <Footer />

            </section>

            <div className="popForm popBook scale-0">
                <Bookings />
            </div>
            <div className="popForm popComplaint scale-0">
                <Complaint />
            </div>
            <div className="popForm popGate scale-0">
                <Gatepass />
            </div>
        </div>

        
    )
}

export default StudentLandingPage
