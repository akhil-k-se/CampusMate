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
import MessMenu from './components/Dashboard/messMenu'
import GateLogin from './components/GateSecurity/gateLogin'
import GateSign from './components/GateSecurity/gateSign'
import MessSign from './components/messLogin/messSignup'
import Wardendetails from './components/superadmin/Dashboard/Wardendetails'
import Warden from './components/superadmin/Dashboard/Warden'
import GateSecurity from './components/superadmin/Dashboard/GateSecurity'
import { useEffect } from 'react'
import axios from 'axios'
import UserMess from './components/MessMenu/MessMenu'
import GuardDetails from './components/superadmin/Dashboard/GuardDetails'
import SuperLogin from './components/superadmin/SuperLogin'
import Dashboard1 from './components/superadmin/Dashboard/Dashboard1'


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
          <Route path='/select-user' element={<AdminOrUser />} />
          <Route path='/student-signup' element={<RegisterLogin />} />
          <Route path='/warden-signup' element={<AdminLogin />} />
          <Route path='/student' element={<StudentLandingPage />} />
          <Route path='/student/booking' element={<Bookings />} />
          <Route path="/warden/dashboard" element={<Dashboard />} />
          <Route path="/warden/student-details" element={<Studentdetails />} />
          <Route path="/warden/gatepasses" element={<Gatepassdetails />} />
          <Route path="/warden/complaints" element={<Complaintbox />} />
          <Route path="/warden/my-account" element={<Account />} />
          <Route path='/student/my-gatepasses' element={<Studentgatepass />} />
          <Route path='/student/my-complaints' element={<StudentComplaints />} />
          <Route path='/student/booking/payment' element={<PaymentPage />} />
          <Route path='/student/QR' element={<QRcode />} />
          <Route path='/guard/mess-login' element={<MessLogin />} />
          <Route path='/warden/update/mess-menu' element={<MessMenu />} />
          <Route path='/guard/scanner' element={<QRScanner />} />
          <Route path='/about' element={<About />} />
          <Route path='/guard/gate-login' element={<GateLogin />} />
          <Route path='/super-admin/create/mess-security' element={<MessSign />} />
          <Route path='/super-admin/login' element={<SuperLogin />} />
          <Route path='/super-admin/details/wardens' element={<Wardendetails />} />
          <Route path='/super-admin/create/warden' element={<Warden />} />
          <Route path='/super-admin/create/gate-security' element={<GateSecurity />} />
          <Route path='/super-admin/details/gate-security' element={<GuardDetails />} />
          <Route path='/super-admin/dashboard' element={<Dashboard1 />} />
          <Route path='/student/mess' element={<UserMess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;