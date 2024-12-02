import React, { useEffect, useState } from "react";
import "./adminOrUser.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function AdminOrUser(props) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (props.trigger) {
  //     gsap.fromTo(
  //       ".chooseUser",
  //       { opacity: 0, scale: 0 },
  //       { opacity: 1, scale: 1, duration: 0.5, stagger: 0.28 }
  //     );
  //   }
  // }, [props.trigger]);

  const handleUserClick = () => navigate("/user-signup");
  const handleAdminClick = () => navigate("/admin-signup");
  const handleMessClick = () => navigate("/messLogin");
  const handleGateClick = () => navigate("/gateLogin");

  return props.trigger? (
    <div className="full">
      <div className="black_div"></div>
      <div className="popup_holder">
        <button className="close-button">
          Close
        </button>
        <div className="popup flex items-center justify-center m-3 flex-1 flex-col position-fixed">
          <div
            onClick={handleGateClick}
            className="chooseUser rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
          >
            <img
              className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Gate Security"
            />
            <h1 className="text-white">GateSecurity</h1>
          </div>
          <div
            className="chooseUser rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
            onClick={handleMessClick}
          >
            <img
              className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Mess Security"
            />
            <h1 className="text-white">MessSecurity</h1>
          </div>
          <div
            onClick={handleAdminClick}
            className="chooseUser rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
          >
            <img
              className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
              src="https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Warden"
            />
            <h1 className="text-white">Warden</h1>
          </div>
          <div
            onClick={handleUserClick}
            className="chooseUser rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
          >
            <img
              className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
              src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Student"
            />
            <h1 className="text-white">Student</h1>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  ) : null;
}

export default AdminOrUser;