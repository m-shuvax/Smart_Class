import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const RegistrationPage = () => {

  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        role: accountType,
        email,
        password,
        firstName,
        lastName,
<<<<<<< HEAD
        phoneNumber,
=======
        phoneNumber
>>>>>>> 33942f66245ac17015d5d162ecd72fd83b308715
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
      <Link
        to="/"
        className="mx-auto mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Login
      </Link>
      <div className="mt-4 min-h-screen bg-gray-100 flex flex-col">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration - All fields are required</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="accountType" className="block font-bold mb-2">
                Account Type
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
                  />
                  <label htmlFor="instructor">Instructor</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-bold mb-2">
                First Name
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
                Last Name
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
                Email Address
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
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              {!passwordError && (
                <p className="text-gray-500 text-sm">The password should be a minimum of 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block font-bold mb-2">
                Phone Number
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
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!isPasswordValid() || !isEmailValid()}
            >
              Register
            </button>
            <Link
              to="/"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
