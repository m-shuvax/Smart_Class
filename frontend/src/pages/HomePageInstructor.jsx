import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../features/Navbar';
import Loader from '../components/Loader';

const UpdateDetails = () => {
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  useEffect(() => {
    document.title = "Update Details";
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/users/me');
        const { role, email, firstName, lastName, phoneNumber } = response.data;
        setAccountType(role);
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNumber(phoneNumber);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmailValid()) {
      setEmailError('Please enter a valid email address.');
      setLoading(false);
      return;
    } else {
      setEmailError('');
    }
    if (!isPasswordValid()) {
      setPasswordError('Please enter a valid password.');
      setLoading(false);
      return;
    } else {
      setPasswordError('');
    }
    if (!isPhoneNumberValid()) {
      setPhoneNumberError('Please enter a valid phone number.');
      setLoading(false);
      return;
    } else {
      setPhoneNumberError('');
    }

    try {
      const response = await axios.put('http://localhost:5000/api/users/account', {
        role: accountType,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      if (response.data) {
        console.log('Update successful:', response.data);
      } else if (response) {
        console.error('Update successful but response is not as expected:', response);
      } else {
        console.error('Update successful but response is not as expected.');
      }

      alert('Update successful');
      window.location.href = '/profile';
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Update failed:', error.response.data);
      } else if (error.response) {
        console.log('Update failed with response but no data:', error.response);
      } else {
        console.log('Update failed:', error);
      }
      alert('Update failed');
    } finally {
      setLoading(false);
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

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
      setPhoneNumberError('');
    } else {
      setPhoneNumberError('Phone number can contain digits only.');
    }
  };

  return (
    <div className="mt-10 min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Link
        to="/"
        className="mx-auto mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </Link>
      <div className="mt-4 min-h-screen bg-gray-100 flex flex-col">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Update Details</h2>
          <form onSubmit={handleSubmit}>
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
                onChange={handlePhoneNumberChange}
                className={`w-full px-4 py-2 border ${phoneNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {phoneNumberError && (
                <p className="text-red-500 text-sm">{phoneNumberError}</p>
              )}
            </div>
            <span className="text-red-500 text-sm">* Required</span>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default UpdateDetails;
