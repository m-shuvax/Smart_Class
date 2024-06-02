import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../features/Navbar';
import { useAppContext } from '../Context';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useAppContext();


  useEffect(() => {
    // Check if the user is already logged in
    const fetchData = async () => { 
      try {
        const response = await axios.get('http://localhost:5000/api/users/', { withCredentials: true });
        console.log('User:', response.data);
        setUser(response.data.data.user);
        const isStudent = user.role === 'student';
        // Redirect based on user role
        if (isStudent) {
          navigate('/HomePageStudent');
        } else {
          navigate('/HomePageInstructor');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [setUser]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', userName, password);

    // send userName and password to server to authenticate user
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email: userName, password },{withCredentials: true});

      // Store the token in state or other storage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      console.log('Response:', response);
      setUser(data.user)

      if (response.data.status === 'success') {
        // Check if the user is a student or a teacher
        const isStudent = response.data.data.user.role === 'student';
        // Redirect based on user role
        if (isStudent) {
          navigate('/HomePageStudent');
        } else {
          navigate('/HomePageInstructor');
        }
      }
    }
    catch (error) {
      // if not authenticated, show error message
      setError('Please enter a valid email and password');
      console.error('Authentication error:', error);
      // if not authenticated, clear userName and password
      setUserName('');
      setPassword('');
    }
  };

  return (
    <div className="flex h-screen bg-blue-100">
      <Navbar />
      <div className="w-2/3 flex justify-center items-center">
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="userName"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <div className="mb-4 relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error ? <p className="text-red-500">{error}</p> : <br />}
          <Link
            to="/HomePageInstructor"
            className="text-sm text-gray-600 hover:text-gray-800 hover:font-bold mt-2 mb-6 inline-block"
          >
            Forgot Password?
          </Link >
          <div className="flex justify-center">
            <div>
              <div>
                <button
                  type="submit"
                  className={`font-bold py-3 px-6 rounded ${!userName || !password ? 'bg-blue-300 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                  disabled={!userName || !password}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/3 bg-blue-200 flex justify-center items-center text-center">
        <div>
          <p className="text-gray-800 mb-4">Not registered yet?</p>
          <Link to="/register">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
