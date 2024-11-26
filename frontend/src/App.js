import './App.css';
import StudentLandingPage from './components/studentLandingPage/studentLandingPage';
import LandingPage from './components/LadingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bookings from './components/booking/booking';
import AdminOrUser from './components/adminOrUser/adminOrUser'
import RegisterLogin from './components/LoginRegister/loginRegister';
import AdminLogin from './components/adminLogin/adminLogin';
import Dashboard from './components/Dashboard/Dashboard'
import Studentdetails from './components/Dashboard/Studentdetails'
import Account from './components/Dashboard/Account'
import Hosteldetails from './components/Dashboard/Hosteldetails'
import Complaintbox from './components/Dashboard/Complaintbox'
import Gatepassdetails from './components/Dashboard/Gatepassdetails'
import Studentgatepass from './components/studentLandingPage/Studentgatepass';
import PaymentPage from './components/payment/PaymentForm';
import QRcode from "./components/QRCode/QRcode";
import MessLogin from './components/messLogin/messLogin';
import QRScanner from './components/QRCode/QRreader';

function App() {
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
          <Route path='/my-passes' element={<Studentgatepass />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/QRcode' element={<QRcode />} />
          <Route path='/mess' element={<MessLogin />} />
          <Route path='/qrscanner' element={<QRScanner/>} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
