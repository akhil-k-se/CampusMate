import React from "react";
import "./adminOrUser.css";
import { PiStudentBold } from "react-icons/pi";
import { BsPersonVcard } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../popup.css";

function AdminOrUser(props) {
  const navigate = useNavigate();
  const handleUserClick = () => {
    console.log("clicked");

    navigate("/user-signup");
  };
  const handleAdminClick = () => {
    console.log("clicked");

    navigate("/admin-signup");
  };
  const handleMessClick = () => {
    console.log("clicked");

    navigate("/mess");
  };

  return props.trigger ? (
    <>
      <div className="full">
        <div className="black_div"></div>
        <div className="popup_holder">
          <div className="popup flex items-center justify-center m-3 flex-1 flex-col position-fixed">
            <div
              className="rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
              onClick={handleMessClick}
            >
              <img
                className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <h1 className="text-white">MessSecurity</h1>
            </div>
            <div
              onClick={handleAdminClick}
              className="rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
            >
              <img
                className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
                src="https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <h1 className="text-white">Warden</h1>
            </div>
            <div
              onClick={handleUserClick}
              className="rounded-[20px] w-[500px] h-[10%] flex items-center justify-center relative cursor-pointer border-[5px] border-white hover:scale-110 transition-all"
            >
              <img
                className="absolute w-full h-full object-cover -z-10 rounded-[10px]"
                src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <h1 className="text-white">Student</h1>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default AdminOrUser;
