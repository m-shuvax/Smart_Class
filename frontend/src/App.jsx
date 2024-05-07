import { useState } from 'react';
import Navbar from './features/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import LoginPage  from './pages/LoginPage';
import RegistrationPage  from './pages/RegistrationPage';
import HomePageStudent  from './pages/HomePageStudent';
import HomePageInstructor  from './pages/HomePageInstructor';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/HomePage" element={<HomePageStudent />} />
          <Route path="/HomePageInstructor" element={<HomePageInstructor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;