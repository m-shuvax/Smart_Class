import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/resetPassword/${token}`, { password, confirmPassword });
      setMessage('Password reset successful');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setError('There was an error resetting the password. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-blue-100">
      <div className="w-2/3 flex justify-center items-center">
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <div className="mb-4">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm New Password"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`font-bold py-3 px-6 rounded ${!password || !confirmPassword ? 'bg-blue-300 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
              disabled={!password || !confirmPassword}
            >
              Reset Password
            </button>
          </div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
