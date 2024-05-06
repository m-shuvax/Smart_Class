import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [showStudents, setShowStudents] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleShowStudents = () => {
    setShowStudents(!showStudents);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form data
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
      <p>This is the homepage.</p>
      <div className="mt-4 flex justify-between">
        <div>
          <button
            onClick={handleShowStudents}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {showStudents ? 'Hide Students' : 'Show Students'}
          </button>
          <button
            onClick={handleShowForm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {showForm ? 'Hide Form' : 'Show Form'}
          </button>
        </div>
        <Link
          to="/login"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
      {showStudents && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Students</h2>
          {/* Render student list or components here */}
        </div>
      )}
      {showForm && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
