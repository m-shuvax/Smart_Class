import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../features/Navbar';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationPage = () => {
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registration";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      const response = await axios.post('http://localhost:5000/api/register', {
        role: accountType,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      if (response.data) {
        console.log('Registration successful:', response.data);
        setLoading(false);
        toast.success('Registration successful, please log in.');
        setTimeout(() => navigate('/'), 3000); // Navigate to login after 3 seconds
      } else {
        console.error('Registration successful but response is not as expected:', response);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('Registration failed');
      }
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

  const isPhoneNumberValid = () => {
    const phoneNumberRegex = /^\d{8,15}$/;
    return phoneNumberRegex.test(phoneNumber);
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
                <div className="mr-4 flex items-center">
                  <input
                    type="radio"
                    id="student"
                    name="accountType"
                    value="student"
                    checked={accountType === 'student'}
                    onChange={() => setAccountType('student')}
                    className="radio-lg form-radio h-5 w-5 text-blue-600"
                    required
                  />
                  <label htmlFor="student" className="ml-2">Student</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="instructor"
                    name="accountType"
                    value="instructor"
                    checked={accountType === 'instructor'}
                    onChange={() => setAccountType('instructor')}
                    className="radio-lg form-radio h-5 w-5 text-blue-600"
                    required
                  />
                  <label htmlFor="instructor" className="ml-2">Instructor</label>
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
                type="text"
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
            {error && (
              <div className="mb-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? <Loader /> : 'Register'}
              </button>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
