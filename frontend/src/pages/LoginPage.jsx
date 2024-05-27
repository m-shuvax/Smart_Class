import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../features/Navbar';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(username, password);

      // send username and password to server to authenticate user
      try {
        const response = await axios.post('/api/auth/login', { username, password });
        // Store the token in state or other storage
        localStorage.setItem('token', response.data.token);


      // Save the token in cookies
      Cookies.set('token', response.data.token, { expires: 7 });
      // The token will be saved for 7 days


        // Check if the user is a student or a teacher
        const isStudent = response.data.role === 'student';

        // Redirect based on user role
        if (isStudent) {
          navigate('/HomePageStudent');
        }
        else {
          navigate('/HomePageInstructor');
        }
      }
      catch (error) {
        // if not authenticated, show error message
        setError('Authentication failed. Please check your credentials.');
        console.error('Authentication error:', error);
        // if not authenticated, clear username and password
        setUsername('');
        setPassword('');
      }
    };

<
 return (
    <div className="flex h-screen bg-blue-100">
      <Navbar />
      <div className="w-2/3 flex justify-center items-center">
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-6">
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <div className="mb-6 relative">
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
          <Link
            to="/HomePageInstructor"
            className="text-sm text-gray-600 hover:text-gray-800 mb-6 inline-block"
          >
            Forgot Password?
          </Link >
          <div className="flex justify-center">
            <div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/3 bg-blue-200 flex justify-center items-center">
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
