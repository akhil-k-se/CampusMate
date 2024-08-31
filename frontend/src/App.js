import './App.css';
import StudentLandingPage from './components/studentLandingPage/studentLandingPage';
import LandingPage from './components/LadingPage/LandingPage';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Bookings from './components/booking/booking';
import AdminOrUser from './components/adminOrUser/adminOrUser'
import RegisterLogin from './components/LoginRegister/loginRegister';
import AdminLogin from './components/adminLogin/adminLogin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/select' element={<AdminOrUser/>}/>
          <Route path='/user-signup' element={<RegisterLogin/>}/>
          <Route path='/admin-signup' element={<AdminLogin/>}/>
          <Route path='/user' element={<StudentLandingPage/>} />
          <Route path='/booking' element={<Bookings/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
