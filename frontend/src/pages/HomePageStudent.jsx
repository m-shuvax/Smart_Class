import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import Navbar from '../features/Navbar';

const HomePageStudent = () => {
  const [classrooms, setClassrooms] = useState(['Math 101', 'English 202', 'History 303', 'Science 404']);
  const [showInput, setShowInput] = useState(false);
  const [newClassroomCode, setNewClassroomCode] = useState('');

  const handleAddClassroom = () => {
    const newClassrooms = [...classrooms, newClassroomCode];
    setClassrooms(newClassrooms);
    setNewClassroomCode('');
    setShowInput(false);
  };

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddClassroom();
    }
  };

  return (
    <div className="fixed top-16 w-screen bg-blue-100 min-h-screen flex">
      <Navbar />
      <div className="w-3/4 pt-8 pl-4">
        <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
        <div className="grid grid-cols-4 gap-4">
          {classrooms.map((classroom, id) => (
            <Link
              key={id}
              to={`/classPageStudent`}
              className="bg-white p-2 rounded-md shadow-md h-32 flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
            >
              {classroom}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/4 pl-6">
        {!showInput && (
          <button
            onClick={handleToggleInput}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            <PlusCircleIcon className="h-5 w-5" />
          </button>
        )}
        {showInput && (
          <>
            <button
              onClick={handleToggleInput}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 mt-4 rounded"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
            <br />
            <input
              type="text"
              placeholder="Enter classroom code"
              value={newClassroomCode}
              onChange={(e) => setNewClassroomCode(e.target.value)}
              onKeyPress={handleEnterKeyPress}
              className="border border-gray-300 rounded px-3 py-2 my-3 w-4/5"
            />
            <button
              onClick={handleAddClassroom}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageStudent;