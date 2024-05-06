import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-blue-100">
      <div className="w-2/3 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-md w-80"
            />
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-800 mb-6 inline-block"
          >
            Forgot Password?
          </Link>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
              Log In
            </button>
          </div>
        </div>
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
