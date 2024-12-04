import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LadingPage/LandingPage'
import About from './components/about/about'
import AdminOrUser from './components/adminOrUser/adminOrUser'
import StudentLandingPage from './components/studentLandingPage/studentLandingPage'
import RegisterLogin from './components/LoginRegister/loginRegister'
import Bookings from './components/booking/booking'
import AdminLogin from './components/adminLogin/adminLogin'
import Dashboard from './components/Dashboard/Dashboard'
import Studentdetails from './components/Dashboard/Studentdetails'
import Account from './components/Dashboard/Account'
import Hosteldetails from './components/Dashboard/Hosteldetails'
import Complaintbox from './components/Dashboard/Complaintbox'
import Gatepassdetails from './components/Dashboard/Gatepassdetails'
import Studentgatepass from './components/studentLandingPage/Studentgatepass'
import PaymentPage from './components/payment/PaymentForm'
import QRcode from "./components/QRCode/QRcode"
import MessLogin from './components/messLogin/messLogin'
import QRScanner from './components/QRCode/QRreader'
import StudentComplaints from './components/studentLandingPage/StudentComplaints'
import MessMenu from './components/MessMenu/MessMenu'
import GateLogin from './components/GateSecurity/gateLogin'
import GateSign from './components/GateSecurity/gateSign'
import MessSign from './components/messLogin/messSignup'
import Account1 from './components/superadmin/Dashboard/Account1'
import Wardendetails from './components/superadmin/Dashboard/Wardendetails'
import Warden from './components/superadmin/Dashboard/Warden'
import GateSecurity from './components/superadmin/Dashboard/GateSecurity'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  useEffect(() => {
    const reponse = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getUserRole', {}, {
          withCredentials: true
        })
      } catch (err) {
        console.log(err);
      }
    }
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/select' element={<AdminOrUser />} />
          <Route path='/user-signup' element={<RegisterLogin />} />
          <Route path='/admin-signup' element={<AdminLogin />} />
          <Route path='/user' element={<StudentLandingPage />} />
          <Route path='/booking' element={<Bookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="studentdetails" element={<Studentdetails />} />
          <Route path="gatepasses" element={<Gatepassdetails />} />
          <Route path="complaintbox" element={<Complaintbox />} />
          <Route path="hostelrooms" element={<Hosteldetails />} />
          <Route path="account" element={<Account />} />
          <Route path='/my-gatepasses' element={<Studentgatepass />} />
          <Route path='/my-complaints' element={<StudentComplaints />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/QRcode' element={<QRcode />} />
          <Route path='/messLogin' element={<MessLogin />} />
          <Route path='/mess-menu' element={<MessMenu />} />
          <Route path='/qrscanner' element={<QRScanner />} />
          <Route path='/about' element={<About />} />
          <Route path='/gateLogin' element={<GateLogin />} />
          <Route path='/gateSignin' element={<GateSign />} />
          <Route path='/messSignIn' element={<MessSign />} />
          <Route path='/suadmin' element={<Account1 />} />
          <Route path='/suwarden' element={<Wardendetails />} />
          <Route path='/suwardenlog' element={<Warden />} />
          <Route path='/susecurity' element={<GateSecurity />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;