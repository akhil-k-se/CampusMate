import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import StudentLandingPage from './components/studentLandingPage/studentLandingPage';
import LandingPage from './components/LadingPage/LandingPage';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/loginRegister';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<LoginRegister/>}/>
          <Route path='/user' element={<StudentLandingPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
