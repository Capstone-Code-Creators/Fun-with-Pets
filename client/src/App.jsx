import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PetRegisterPage from './pages/PetRegisterPage';
import Navbar from './components/NavBar';
import LocalEvents from './pages/LocalEvents';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PetRegisterPage" element={<PetRegisterPage />} />
        <Route path="/LocalEvents" element={<LocalEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
