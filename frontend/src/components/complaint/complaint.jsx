import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from 'axios'
import '../repeatPop.css'

const Complaint = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [step, setStep] = useState(1);
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        enrollmentNumber:'',
        issuetype:'',
        issue:'',
        description:'',
    });

    const images = [
        {
            src: "https://images.pexels.com/photos/7969098/pexels-photo-7969098.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Capture the Beauty",
        },
        {
            src: "https://images.pexels.com/photos/4907235/pexels-photo-4907235.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            src: "https://images.pexels.com/photos/7969094/pexels-photo-7969094.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    useEffect(() => {
        gsap.fromTo(
            ".signup-container",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline
            .to(".signup-image", {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power4.out",
                stagger: 0.1,
            })
            .set(".signup-image", { opacity: 0, scale: 0.8 })
            .to(`.signup-image:nth-child(${ currentImage + 1})`, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
    });
}, [currentImage]);

const handleClick = () => {
    navigate("/user");
    if (window.location.pathname === "/") {
        window.location.reload();
    }
};

const handleSlide = (index) => {
    if (index !== currentImage) {
        setCurrentImage(index);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3005/usercomplaints", formData);
        alert('Complaint Registered Successfully');
        navigate('/user');
    } catch (err) {
        console.error(err);    
        const errorMessage = err.response?.data?.message || 'An error occurred';
        alert(errorMessage);
    }
};

function handlePopClose(){
    const forms = document.getElementsByClassName("popForm");
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.transform = 'scale(0)';
    }    
}

return (
    <div className="fixer">
        <div className="black__div"></div>
        <div className="w-full h-screen bg-transparent flex items-center justify-center main_form">
        <div className="signup-container w-[70%] h-[70%] bg-white rounded-2xl flex overflow-hidden p-2 px-2 relative gap-3">
            <img
                className="absolute left-0 z-10 top-0"
                width={150}
                src="/logo-noback.png"
                alt=""
            />
            
            <p className="absolute z-10 text-white bottom-0 text-[70px] font-montserrat my-20 mx-[50px] font-bold block text-center">
                HostelSync
            </p>
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={`Slide ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity rounded-2xl signup-image ${currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }}
            />
        ))}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlide(index)}
                            className={`w-6 h-3 rounded-full ${currentImage === index ? "bg-white" : "bg-white/50"
                                } transition-all duration-300`}
                        ></button>
                    ))}
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between font-montserrat gap-2 p-5">
                <div className="flex h-full w-full flex-col gap-5 justify-between">
                    <div className="flex justify-between">
                        <h1 className="text-[40px]">Raise a Complaint</h1>
                        <button onClick={handlePopClose}>X</button>
                    </div>
                    <div className="w-full h-full flex flex-col gap-4 justify-between flex-1">
                        <div>
                            <input 
                                name="enrollmentNumber"
                                className="border-black border-solid border-[2px] p-5 rounded-2xl w-full"
                                type="text"
                                placeholder="University RollNo."
                                value={formData.enrollmentNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                name="issuetype"
                                className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                type="text"
                                placeholder="Issue Type"
                                value={formData.issuetype}
                                onChange={handleChange}
                                required>
                                <option value="">Select Issue Type</option>
                                <option value="Room Maintenance">Room Maintenance</option>
                                <option value="Cleanliness and Hygiene">Cleanliness and Hygiene</option>
                                <option value="Food and Dining">Food and Dining</option>
                                <option value="Safety and Security">Safety and Security</option>
                                <option value="Facilities and Amenities">Facilities and Amenities</option>
                                <option value="Hostel wardenistration">Hostel wardenistration</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                name="issue"
                                className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                type="text"
                                placeholder="Issue"
                                value={formData.issue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="h-full">
                            <input
                                name="description"
                                className="border-black border-solid border-[2px] p-5 rounded-2xl w-full"
                                type="text"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-end">
                        <button
                            onClick={handleSubmit}
                            className="w-full text-[30px] text-white bg-[#e82574] p-3 rounded-2xl hover:bg-[#bc1c5c] transition-all">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
);
};

export default Complaint;