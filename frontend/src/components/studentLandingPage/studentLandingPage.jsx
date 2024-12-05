import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import "../studentLandingPage/studentLandingPage.css";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Bookings from "../booking/booking";
import "../repeatPop.css";
import Gatepass from "../gatepass/gatepass";
import Complaint from "../complaint/complaint";
import { BsFillPencilFill } from "react-icons/bs";
import axios from "axios";

function StudentLandingPage() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["beginning", "friends", "family"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const [isRoomBooked, setIsRoomBooked] = useState(false);

  const period = 100;

  const navigate = useNavigate();

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updatedText == fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText == "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  function handlePopBook() {
    const forms = document.getElementsByClassName("popBook");
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.transform = "scale(1)";
    }
  }
  function handlePopGate() {
    const forms = document.getElementsByClassName("popGate");
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.transform = "scale(1)";
    }
  }
  function handlePopComplaint() {
    const forms = document.getElementsByClassName("popComplaint");
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.transform = "scale(1)";
    }
  }
  const [userData, setUserData] = useState(null);
  const [img, setImg] = useState(null);

  const getUserData = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:3005/student/showdata",
        {
          withCredentials: true, // Include credentials for cookies
        }
      );
      // console.log(userResponse.data.user.name);
      setUserData(userResponse.data.user.name);
      setImg(userResponse.data.user.img);
    } catch (err) {
      console.log(err);
    }
  };

  const checkRoomBookingStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/student/isBooked",
        {
          withCredentials: true, // Include credentials for cookies
        }
      );
      setIsRoomBooked(response.data.isRoomBooked);
      console.log(response.data.isRoomBooked); // Update booking status
    } catch (err) {
      console.error("Error fetching room booking status:", err);
    }
  };


  if (!userData) {
    getUserData();
    checkRoomBookingStatus();
  };

  return (
    <div>
      <section className="main_page w-screen">
        <Navbar />
        <Container className="banner w-[90%] ml-[5%]" id="home">
          <div className="black-div"></div>
          <div className="align-items-center">
            <div className="user">
              <div className="userImg">
                <span className="tagline">
                  Welcome Student<span id="pink-bar"></span>
                  {userData}
                </span>
                <h1>
                  {`New `}
                  <span className="wrap">{text}</span>
                </h1>
                <p>
                  We're excited to have you on board. Manage your hostel stay, check upcoming events, and stay updated with all the latest announcements. Your journey to a seamless and comfortable hostel experience begins here!
                </p>
                {!isRoomBooked && (
                  <button onClick={handlePopBook} className="btn">
                    Book Room
                  </button>
                )}
              </div>

              <div className="userName">
                <div className="img_holder w-45 h-45 rounded-full overflow-hidden">
                  <img
                    src={img}
                    className="w-full h-full object-cover border-4 border-white"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </Container>

        <section class="section__container about__container flex flex-wrap" id="gatepass">
          <div class="about__content">
            <p class="section__subheader">GATEPASS</p>
            <h2 class="section__header">Ticket to go out of the Campus</h2>
            <p class="section__description">
              With a focus on quality accommodations, personalized experiences,
              and seamless booking, our platform is dedicated to ensuring that
              every traveler embarks on their dream holiday with confidence and
              excitement.
            </p>
            <div class="about__btn">
              <button class="btn" onClick={handlePopGate}>
                Apply Gatepass
              </button>
            </div>
          </div>
          <div class="about__image">
            <img src="/9557011.jpg" alt="about" />
          </div>
        </section>

        <section class="section__container about__container flex flex-wrap" id="complaint">
          <div class="about__image">
            <img src="/complaint.jpg" alt="about" />
          </div>
          <div class="about__content">
            <p class="section__subheader">COMPLAINTS</p>
            <h2 class="section__header">Nothing goes unheard !</h2>
            <p class="section__description">
              With a focus on quality accommodations, personalized experiences,
              and seamless booking, our platform is dedicated to ensuring that
              every traveler embarks on their dream holiday with confidence and
              excitement.
            </p>
            <div class="about__btn">
              <button class="btn" onClick={handlePopComplaint}>
                Raise a complaint
              </button>
            </div>
          </div>
        </section>

        <section class="explore" id="explore">
          <p class="section__subheader">EXPLORE</p>
          <h2 class="section__header">What's New Today.</h2>
          <div class="explore__bg relative">
            <div className="black-div"></div>
            <div class="explore__content">
              <p class="section__description">10th AUG 2024</p>
              <h4>A New Mess Menu Is Available In Our Hostels.</h4>
              <NavLink to="/user/mess">
                <button class="btn">View Menu</button>
              </NavLink>
            </div>
          </div>
        </section>

        <Footer page="subpage" />
        
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
  );
}

export default StudentLandingPage;
