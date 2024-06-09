import react, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePageStudent from './pages/HomePageStudent';
import HomePageInstructor from './pages/HomePageInstructor';
import ClassPageInstructor from './pages/classPageInstructor'
import StudentList from './pages/StudentsList'
import UpdateDetails from './pages/UpdateDetails'
import NewStudentClass from './pages/newClassStudent'
import ResetPassword from './pages/ResetPassword';
import { AppProvider } from './Context';

function App() {
  return (
    <Router>
      <AppProvider>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/HomePageStudent" element={<HomePageStudent />} />
            <Route path="/HomePageInstructor" element={<HomePageInstructor />} />
            <Route path="/ClassPageStudent/" element={<NewStudentClass />} />
            <Route path="/ClassPageInstructor" element={<ClassPageInstructor />} />
            <Route path="/StudentList" element={<StudentList />} />
            <Route path="/UpdateDetails" element={<UpdateDetails />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;