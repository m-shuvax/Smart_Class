import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forgetPassword', { email });
      toast.success('An email will be sent to reset the password')
      setError('');
    } catch (error) {
      toast.error('There was an error sending the email.');
      setMessage('');
    }
  };

  return (
    <div>
      <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-md w-80"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`font-bold py-3 px-6 rounded ${!email ? 'bg-blue-300 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
            disabled={!email}
          >
            Send Reset Email
          </button>
        </div>
        {message && <p className="text-green-500 mt-4">An email will be sent to reset the password</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button 
          type="button" 
          className="text-blue-500 mt-4" 
          onClick={onBackToLogin}
        >
          Back to Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordForm;
