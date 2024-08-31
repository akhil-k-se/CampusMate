import React from 'react'
import './adminOrUser.css'
import { PiStudentBold } from "react-icons/pi";
import { BsPersonVcard } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'
import '../popup.css'

function AdminOrUser(props) {
    
    const navigate = useNavigate()
    const handleUserClick = ()=> {
        console.log("clicked");
        
        navigate("/user-signup");
    }
    const handleAdminClick = ()=> {
        console.log("clicked");
        
        navigate("/admin-signup");
    }

    return (props.trigger) ? (
        <>
            <div className="full">
                <div className="black_div"></div>
                <div className="popup_holder">
                    <div className="popup">
                        <div className="boxNew admin_box">
                            <div className="overlay over_admin" onClick={handleAdminClick}>
                                <BsPersonVcard className='illustration'/>
                                <h1>Warden</h1>
                            </div>
                        </div>
                        <div className="boxNew user_box">
                            <div className="overlay over_user" onClick={handleUserClick} >
                                <PiStudentBold className='illustration'/>
                                <h1>Student</h1>
                            </div>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </>
    ) : "";
}

export default AdminOrUser
