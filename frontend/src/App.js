import './App.css';
import StudentLandingPage from './components/studentLandingPage/studentLandingPage';
import LandingPage from './components/LadingPage/LandingPage';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Bookings from './components/booking/booking';
import AdminOrUser from './components/adminOrUser/adminOrUser'
import RegisterLogin from './components/LoginRegister/loginRegister';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/select' element={<AdminOrUser/>}/>
          <Route path='/signup' element={<RegisterLogin/>}/>
          <Route path='/user' element={<StudentLandingPage/>} />
          <Route path='/booking' element={<Bookings/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
