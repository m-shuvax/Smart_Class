import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsButton = () => {
  const navigate = useNavigate();

  const handlesettings = () => {
    // Perform logout logic here
    // For example, remove the authentication token from localStorage
    // localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/register');
  };

  return (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center"
          onClick={handlesettings}
        >
          Settings
        </button>
  );
};

export default SettingsButton;





