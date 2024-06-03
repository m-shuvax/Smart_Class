import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../features/Navbar';
import { useAppContext } from '../Context';

const HomePageInstructor = () => {
  const { user, setUser } = useAppContext();
  const [classes, setClasses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [students, setStudents] = useState([]);


  useEffect(() => {
    console.log(user);
    const fetchClassrooms = async () => {
      try {
        console.log('Fetching classrooms');
        const response = await axios.get('http://localhost:5000/api/users/classes', { withCredentials: true });
        console.log('Response:', response.data);
        setClasses(response.data.classes);
        setStudents(response.data.pendingStudents);
        setUser(response.data.user);
        console.log('User:', user);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };
    fetchClassrooms();
  }, []);

  const handleAddClassroom = async () => {
    if (newClassName.trim() === '') return;
    try {
      const response = await axios.post('http://localhost:5000/api/users/classes', {
        name: newClassName,
      }, { withCredentials: true });
      console.log('Response:', response.data);
      alert('the ID of the class is ' + response.data._id)
      setClasses([...classes, response.data]);
      setNewClassName('');
      setShowInput(false);
      alert('the ID of the class is ' + response.data._id)
    } catch (error) {
      console.error('Error adding classroom:', error);
    }
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
    <div className="h-screen bg-blue-100 flex">
      <Navbar />
      <div className="w-3/4 pt-20 pl-6">
        <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
        <div className="grid grid-cols-4 gap-4">
          {classes.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/classPageInstructor`}
              className="bg-white p-2 rounded-md shadow-md h-32 flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
            >
              {classroom.name} (ID: {classroom._id})
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/4 pr-4 pt-20">
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
                    onClick={() => handleStudentClick(student)}
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
