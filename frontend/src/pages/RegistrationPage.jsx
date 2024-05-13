import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const RegistrationPage = () => {
  

  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
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
              <label htmlFor="street" className="block font-bold mb-2">
                Street
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="houseNumber" className="block font-bold mb-2">
                House Number
              </label>
              <input
                type="text"
                id="houseNumber"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block font-bold mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block font-bold mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipCode" className="block font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
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
