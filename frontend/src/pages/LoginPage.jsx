import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../features/Navbar';
import { useAppContext } from '../Context';
import ForgotPasswordForm from '../components/ForgotPassword';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useAppContext();
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Smart Class";

    const registrationMessage = localStorage.getItem('registrationMessage');
    if (registrationMessage) {
      setMessage(registrationMessage);
      localStorage.removeItem('registrationMessage');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/', { withCredentials: true });
        const newUser = response.data.data.user;
        setUser(newUser);
        const isStudent = newUser.role === 'student';

        if (isStudent) {
          navigate('/HomePageStudent');
        } else {
          navigate('/HomePageInstructor');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!user) {
      fetchData();
    }
  }, [navigate, setUser, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email: userName, password }, { withCredentials: true });
      setUser(response.data.data.user);
      const isStudent = response.data.data.user.role === 'student';
      if (isStudent) {
        navigate('/HomePageStudent');
      } else {
        navigate('/HomePageInstructor');
      }
    } catch (error) {
      setError('Please enter a valid email and password');
      setUserName('');
      setPassword('');
    }
  };

  return (
    <div className="flex h-screen bg-blue-100">
      <Navbar />
      <div className="w-2/3 flex justify-center items-center">
        {showForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={() => setShowForgotPassword(false)} />
        ) : (
          <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
             {message && <div className="mb-4 text-green-500">{message}</div>}
            <div className="mb-6">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="email"
                placeholder="Email"
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
            {error && <p className="text-red-500">{error}</p>}
            <button 
              type="button" 
              className="text-blue-500 mt-2 mb-6 inline-block"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`font-bold py-3 px-6 rounded ${!userName || !password ? 'bg-blue-300 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                disabled={!userName || !password}
              >
                Log In
              </button>
            </div>
          </form>
        )}
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
