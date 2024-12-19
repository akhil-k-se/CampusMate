import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import '../repeatPop.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gatepass = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [step, setStep] = useState(1);
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        enrollmentNumber: '',
        outday: '',
        reason: '',
        outtime: '',
        intime: '',
        outdate: '',
        indate: ''
    });

    const images = [
        {
            src: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Capture the Beauty",
        },
        {
            src: "https://images.pexels.com/photos/697244/pexels-photo-697244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            src: "https://images.pexels.com/photos/3811011/pexels-photo-3811011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
            .to(`.signup-image:nth-child(${currentImage + 1})`, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power4.out",
            });
    }, [currentImage]);

    const handleClick = () => {
        navigate("/student");
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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const outDate = new Date(formData.outdate);
        outDate.setHours(0, 0, 0, 0);


        const inDate = formData.indate ? new Date(formData.indate) : null;
        if (inDate) {
            inDate.setHours(0, 0, 0, 0);
        }

        // console.log(today," ",outDate," ",inDate)

        console.log("The Today is ", inDate);


        if (outDate < today) {
            return toast.error("You cannot apply for a gate pass for past dates.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
        }

        const maxAllowedOutDate = new Date(today);
        maxAllowedOutDate.setDate(today.getDate() + 2);

        if (outDate > maxAllowedOutDate) {
            return toast.error("You can appply gatepass in advance for max of 2 days", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }

        const outTime = new Date(`2024-01-01T${formData.outtime}:00`);
        const inTime = new Date(`2024-01-01T${formData.intime}:00`);

        const minOutTime = new Date(2024, 0, 1, 6, 0, 0);
        const maxInTime = new Date(2024, 0, 1, 20, 0, 0);



        if (formData.outday === "Day Out") {
            if (outTime < minOutTime || outTime > maxInTime) {
                return toast.error("For Day Out, Out-Time must be between 6 AM and 8 PM.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }

            if (inTime < minOutTime || inTime > maxInTime) {
                return toast.error("In-Time must be between 6 AM and 8 PM.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                
            }

            if (outTime >= inTime) {
                return toast.error("Out-Time must be earlier than In-Time.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        }

        if (formData.outday === "Night Out") {
            if (!inDate) {
                return toast.error("Please provide an In-Date for Night Out.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }

            if (inDate <= outDate) {
                return toast.error("In-Date must be later than Out-Date.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }

            const dayDifference = Math.ceil((inDate - outDate) / (1000 * 60 * 60 * 24));
            if (dayDifference > 7) {
                return toast.error("Night Out cannot exceed 7 days. Contact the warden for approval.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }

            if (outDate > maxAllowedOutDate) {
                return toast.error("Night Out passes can only be applied for the current day or up to 2 days in advance.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        }

        try {
            const response = await axios.post(
                "https://campus-mate.onrender.com/gatePass/checkGatePass",
                { enrollmentNumber: formData.enrollmentNumber, date: formData.outdate },
                { withCredentials: true }
            );
            if (response.data.exists) {
                return toast.error("You can only apply for one Day Out gate pass per day.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            return toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }

        try {
            const response = await axios.post(
                "https://campus-mate.onrender.com/gatepass",
                formData,
                { withCredentials: true }
            );
            toast.success("Gate Pass Applied Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            navigate("/student");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }
    };




    function handlePopClose() {
        const forms = document.getElementsByClassName("popForm");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(0)';
        }
    }

    return (
        <div className="fixer">
            <div className="black__div"></div>
            <ToastContainer />
            <div className="w-full h-screen bg-transparent flex items-center justify-center main_form">
                <div className="signup-container w-[70%] h-[90%] bg-white rounded-2xl flex overflow-hidden p-2 px-2 relative gap-3">
                    <img
                        className="absolute left-0 z-10 top-0"
                        width={150}
                        src="/logo-noback.png"
                        alt=""
                    />

                    <p className="absolute z-10 text-white bottom-0 text-[70px] font-montserrat my-20 mx-[50px] font-bold block text-center">
                        CampusMate
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
                        <div className="flex flex-col gap-10 justify-between">
                            <div className="flex justify-between">
                                <h1 className="text-[40px]">Apply Gatepass</h1>
                                <button onClick={handlePopClose}>X</button>
                            </div>
                            <div className="flex flex-col gap-4 justify-between">
                                <div>
                                    <input
                                        name="enrollmentNumber"
                                        className="border-black border-solid border-[2px] p-5 rounded-2xl w-full"
                                        type="number"
                                        placeholder="University RollNo."
                                        value={formData.enrollmentNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        name="outday"
                                        className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                        type="text"
                                        placeholder="Out Day"
                                        value={formData.outday}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Select Out Day</option>
                                        <option value="Day Out">Day Out</option>
                                        <option value="Night Out">Night Out</option>
                                    </select>
                                    <select
                                        name="reason"
                                        className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                        type="text"
                                        placeholder="Reason for out"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Select Reason</option>
                                        <option value="Going to Tricity">Going to Tricity</option>
                                        <option value="Going Home">Going Home</option>
                                        <option value="Going for Grooming">Going for Grooming</option>
                                        <option value="Vacation">Vacation</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Going to City">Going to City</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="block mb-1 text-gray-700">Out Time</label>
                                    <input
                                        name="outtime"
                                        className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                        type="time"
                                        placeholder="Out Time"
                                        value={formData.outtime}
                                        onChange={handleChange}
                                    />
                                    <label className="block mb-1 text-gray-700">In Time</label>
                                    <input
                                        name="intime"
                                        className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                        type="time"
                                        placeholder="In Time"
                                        value={formData.intime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    {formData.outday === 'Night Out' ? (
                                        <>
                                            <label className="block mb-1 text-gray-700">Out Date</label>
                                            <input
                                                name="outdate"
                                                className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                                type="date"
                                                placeholder="Out Date"
                                                value={formData.outdate}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="block mb-1 text-gray-700">In Date</label>
                                            <input
                                                name="indate"
                                                className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                                type="date"
                                                placeholder="In Date"
                                                value={formData.indate}
                                                onChange={handleChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label className="block mb-1 text-gray-700">Out Date</label>
                                            <input
                                                name="outdate"
                                                className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                                type="date"
                                                value={formData.outdate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-full flex items-end">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full text-[30px] text-white bg-[#282524] p-3 rounded-2xl hover:bg-[#a48152] transition-all"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gatepass;