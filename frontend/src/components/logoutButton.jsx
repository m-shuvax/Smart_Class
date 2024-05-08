// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // For example, remove the authentication token from localStorage
    // localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      LogOut
    </button>
  );
};

export default LogoutButton;
