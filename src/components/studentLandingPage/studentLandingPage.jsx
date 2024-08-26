import React , {useState, useEffect}from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {ArrowRightCircle} from 'react-bootstrap-icons'
import '../studentLandingPage/studentLandingPage.css'

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
            <Container className='banner' id='home'>
                <div className='black-div' ></div>
                <div className='align-items-center'>
                    <div className='user'>
                        <div className="userImg">
                        <span className='tagline'>Welcome {`User`}<span></span></span>
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
        </section>
    )
}

export default StudentLandingPage
