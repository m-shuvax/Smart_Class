import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import Navbar from '../features/Navbar';
import axios from 'axios';
import { useAppContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePageStudent = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newClassroomCode, setNewClassroomCode] = useState('');
  const { user, setUser, classId, setClassId } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(classId);
        const response = await axios.get('http://localhost:5000/api/studentHomePage', { withCredentials: true })
        console.log(response);
        setUser(response.data.user);
        setClassrooms(response.data.classes);
        console.log(classrooms)
      }

      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [classId]);

  useEffect(() => {
    document.title = "Home Page";
  }, []);

  const handleAddClassroom = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pendingStudents/${newClassroomCode}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success('Your request to join the class has been received successfully. Please wait for the instructor\'s approval.', {
          autoClose: 8000
        });
        setNewClassroomCode('');
        setShowInput(false);
      } else {
        throw new Error('Failed to join the class');
      }
    } catch (error) {
      console.error('Error joining the class:', error);
      toast.error(`An error occurred while joining the class, Please try again.`, {
        autoClose: 8000
      });
    }
  };

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="fixed top-16 w-screen bg-blue-100 min-h-screen flex">
      <Navbar />
      <div className="w-3/4 pt-8 pl-4">
        <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
        <div className="grid grid-cols-4 gap-4">
          {classrooms.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/ClassPageStudent/${classroom._id}`}
              onClick={() => { setClassId(classroom._id); console.log(33, classId) }}
              className="text-2xl bg-[url('src/assets/class.jpg')] bg-cover bg-center border-2 border-current p-2 rounded-md shadow-md h-32 flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
            >
              <span className='bg-blue-200 opacity-70 px-1.5 py-0.5 rounded'>{classroom.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/4 pl-6">
        {!showInput && (
          <button
            onClick={handleToggleInput}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 flex items-center rounded"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Join Classroom
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
              // onKeyPress={handleEnterKeyPress}
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
      <ToastContainer />
    </div>
  );
};

export default HomePageStudent;
