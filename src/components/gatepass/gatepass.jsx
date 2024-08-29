import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import '../repeatPop.css'

const Gatepass = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [step, setStep] = useState(1);

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

const handleNextStep = () => {
    setStep(step + 1);
};

const handlePreviousStep = () => {
    setStep(step - 1);
};

const handleSubmit = () => {
    navigate("/gatepass");
    if (window.location.pathname === "/") {
        window.location.reload();
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
                {step === 1 && (
                    <div className="flex flex-col gap-5 justify-between">
                        <div className="flex justify-between">
                            <h1 className="text-[40px]">Apply Gatepass</h1>
                            <button onClick={handlePopClose}>X</button>
                        </div>
                        <div className="w-full h-full flex flex-col gap-4 justify-between">
                            <div className="flex items-center gap-3 text-[15px]">
                                <input type="checkbox" />
                                <h1>
                                    Day Out
                                </h1>
                                <input type="checkbox" />
                                <h1>
                                    Night Out
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="Out Date"
                                />
                                <input
                                    className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="Out Time"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="In Date"
                                />
                                <input
                                    className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="In Time"
                                />
                            </div>
                            <div className="flex">
                                <input
                                    className="border-black border-solid border-[2px] p-5 rounded-2xl w-full"
                                    type="text"
                                    placeholder="Reason"
                                />
                            </div>
                        </div>
                        <div className="w-full h-full flex items-end">
                            <button
                                onClick={handleSubmit}
                                className="w-full text-[30px] text-white bg-[#e82574] p-3 rounded-2xl hover:bg-[#bc1c5c] transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    </div>
);
};

export default Gatepass;