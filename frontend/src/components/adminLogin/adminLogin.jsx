import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../LoginRegister/loginRegister.css'

function AdminLogin() {
    const navigate = useNavigate()
    const handleClick = ()=> {
        console.log("clicked");
        
        navigate("/account");
    }

    const [isActive, setIsActive] = useState(false);

    const makeActive = () => {
        setIsActive(true);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    return (
            <div className="logMain">
                <div class={isActive ? "logContainer active" : "logContainer"} id="logContainer">
                <div class="form-logContainer sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-logContainer sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <input type="email" placeholder="Email"/>
                            <input type="password" placeholder="Password"/>
                                <a href="#">Forget Your Password?</a>
                                <button onClick={handleClick}>Sign In</button>
                    </form>
                </div>
                    <div class="toggle-logContainer">
                        <div class="toggle">
                            <div class="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button class="hider" id="login" onClick={removeActive}>Sign In</button>
                            </div>
                            <div class="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button class="hider" id="register" onClick={makeActive}>Sign Up</button>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )
}

export default AdminLogin
