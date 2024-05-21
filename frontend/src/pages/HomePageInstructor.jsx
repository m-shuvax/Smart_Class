import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
FaCheck
import { FaCheck } from 'react-icons/fa';
const HomePageInstructor = () => {
  const [classrooms, setClassrooms] = useState([
    { id: '1', name: 'Math 101' },
    { id: '2', name: 'English 202' },
    { id: '3', name: 'History 303' },
    { id: '4', name: 'Science 404' }
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  const students = [
    { id: 1, firstName: 'Abigail', lastName: 'Cohen', email: 'r0527135949@gmail.com', phoneNumber: '0552759894' },
    { id: 2, firstName: 'Uri', lastName: 'Levy', email: 'm0527657776@gmail.com', phoneNumber: '0627657776' },
    { id: 3, firstName: 'Michael', lastName: 'Golan', email: 'tr0526696507@gmail.com', phoneNumber: '0526696507' },
    { id: 4, firstName: 'Beny', lastName: 'Zaiddman', email: 23, phoneNumber: '58378634789' },
    { id: 5, firstName: 'Meir', lastName: 'Noishtut', email: 23, phoneNumber: '246346' },
    { id: 6, firstName: 'Meny', lastName: 'Shubkas', email: 23, phoneNumber: '05265752696507' },
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleAddClassroom = () => {
    const id = `class-${Date.now()}`;
    const newClassrooms = [...classrooms, { id, name: newClassName }];
    setClassrooms(newClassrooms);
    setNewClassName('');
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
    <div className="mt-16 min-h-screen bg-blue-100 p-6 flex">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
        <div className="grid grid-cols-4 gap-4">
          {classrooms.map((classroom) => (
            <Link
              key={classroom.id}
              to={`/classPageInstructor`} // Changed to `/classPageInstructor`
              className="bg-white p-2 rounded-md shadow-md h-32 flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
            >
              {classroom.name} (ID: {classroom.id})
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/4 pl-4">
        {!showInput && (
          <div>
            <button
              onClick={handleToggleInput}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Classroom
            </button>
            <div className="p-4 mt-4 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-2">Pending Students</h2>
              <ul>
                {students.map((student) => (
                  <li
                    key={student.id}
                    className="text-left cursor-pointer text-blue-600 bg-blue-100 hover:bg-blue-200 text-center text-2xl my-2 rounded-md shadow-md flex justify-between items-center"
                  >
                    <button>
                      <XCircleIcon className="h-6 w-6 hover:text-red-700" />
                    </button>
                    {student.firstName} {student.lastName}<br /> class id {student.id}
                    <button className="bg-blue-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center">
                      <FaCheck className="h-14 w-4 mr-2" />
                    </button>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        )}
        {showInput && (
          <>
            <div className="flex items-center mb-4">
              <button
                onClick={handleToggleInput}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-l"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
              <input
                type="text"
                placeholder="Enter classroom name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                onKeyPress={handleEnterKeyPress}
                className="border border-gray-300 rounded-r px-3 py-2 w-full"
              />
            </div>
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

export default HomePageInstructor;
