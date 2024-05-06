import { useState } from 'react';
import Navbar from './features/navigation/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ClassroomPage from './pages/ClassroomPage';
import LoginPage  from './pages/LoginPage';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/classrooms" element={<ClassroomPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
