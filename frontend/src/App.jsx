import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage  from './pages/LoginPage';
import RegistrationPage  from './pages/RegistrationPage';
import HomePageStudent  from './pages/HomePageStudent';
import HomePageInstructor  from './pages/HomePageInstructor';
import ClassPageStudent from './pages/classPageStudent'
import ClassPageInstructor from './pages/classPageInstructor'
import StudentList from './pages/StudentsList'
import UpdateDetails from './pages/UpdateDetails'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/HomePageStudent" element={<HomePageStudent />} />
          <Route path="/HomePageInstructor" element={<HomePageInstructor />} />
          <Route path="/ClassPageStudent/:classId" element={<ClassPageStudent />} />
          <Route path="/ClassPageInstructor" element={<ClassPageInstructor />} />
          <Route path="/StudentList" element={<StudentList />} />
          <Route path="/UpdateDetails" element={<UpdateDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;