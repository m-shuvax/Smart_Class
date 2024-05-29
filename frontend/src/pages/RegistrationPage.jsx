import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../features/Navbar';


const RegistrationPage = () => {

  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password before submission
    if (!isEmailValid) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    else {
      setEmailError('');
    }
    if (!isPasswordValid) {
      setPasswordError('Please enter a valid password.');
      return;

    }
    else {
      setPasswordError('');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        role: accountType,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      if (response.data) {
        console.log('Registration successful:', response.data);
      }
      else if (response) {
        console.error('Registration successful but response is not as expected:', response);
      }
      else {
        console.error('Registration successful but response is not as expected.');
      }

      alert('Registration successful')
      // Navigate to the login page
      window.location.href = '/';

      // TO DO: to  

      // כאן אתה יכול להוסיף פעולות נוספות כגון הצגת הודעת הצלחה למשתמש או ניתוב לדף אחר
    }


    catch (error) {
      if (error.response && error.response.data) {
        console.log('Registration failed:', error.response.data);
      }
      else if (error.response) {
        console.log('Registration failed with response but no data:', error.response);
      }
      else {
        console.log('Registration failed:');
      }
      alert('Registration failed')


      // כאן אתה יכול להוסיף טיפול בשגיאה, לדוגמה הצגת הודעת שגיאה למשתמש
    }
  };


  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!isEmailValid()) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (!isPasswordValid()) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and one digit.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="mt-10 min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Link
        to="/"
        className="mx-auto mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Login
      </Link>
      <div className="mt-4 min-h-screen bg-gray-100 flex flex-col">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="accountType" className="block font-bold mb-2">
                <span className="text-red-500">*</span> Account Type
              </label>
              <div className="flex">
                <div className="mr-4">
                  <input
                    type="radio"
                    id="student"
                    name="accountType"
                    value="student"
                    checked={accountType === 'student'}
                    onChange={() => setAccountType('student')}
                    className="mr-2"
                    required // הוספת קריאה לערך חובה
                  />
                  <label htmlFor="student">Student</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="instructor"
                    name="accountType"
                    value="instructor"
                    checked={accountType === 'instructor'}
                    onChange={() => setAccountType('instructor')}
                    className="mr-2"
                    required // הוספת קריאה לערך חובה
                  />
                  <label htmlFor="instructor">Instructor</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-bold mb-2">
                <span className="text-red-500">*</span> First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-bold mb-2">
                <span className="text-red-500">*</span> Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">
                <span className="text-red-500">*</span> Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">
                <span className="text-red-500">*</span> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              {!passwordError && (
                <p className="text-gray-500 text-sm">
                  The password should be a minimum of 8 characters long and include at least one uppercase letter, one
                  lowercase letter, and one digit
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block font-bold mb-2">
                <span className="text-red-500">*</span> Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <span className="text-red-500 text-sm font-bold">* All fields are required</span>
            <button
              type="submit"
              className={`mt-4 w-full font-bold py-2 px-4 rounded ${!isPasswordValid() || !isEmailValid() ? 'bg-blue-300 hover:bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white ${!isPasswordValid() || !isEmailValid() ? 'cursor-not-allowed' : ''}`}
              disabled={!isPasswordValid() || !isEmailValid()}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
