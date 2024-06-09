import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { FaCheck, FaRegCopy } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../features/Navbar';
import { useAppContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePageInstructor = () => {
  const { user, setUser, setClassId } = useAppContext();
  const [classes, setClasses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    document.title = "Home Page";
    console.log(user);
    const fetchClassrooms = async () => {
      try {
        console.log('Fetching classrooms');
        const response = await axios.get('http://localhost:5000/api/users/classes', { withCredentials: true });
        console.log('Response:', response.data);
        setClasses(response.data.classes);

        // Assuming response.data.pendingStudents is an array of student objects with class information
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
      toast.success('You have successfully created a new class')
      setClasses([...classes, response.data]);
      setNewClassName('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding classroom:', error);
    }
  };

  const handleApproveStudent = async (studentId, classId) => {
    try {
      console.log('Approving student:', studentId, classId);
      await axios.post('http://localhost:5000/api/users/pendingStudents', {
        studentId,
        classId,
        action: 'approve',
      }, { withCredentials: true });

      // Remove the approved student from the pending students list
      setStudents(students.filter(student => !(student._id === studentId && student.classId === classId)));

      // Show success toast
      toast.success('Student has joined the class!');
    } catch (error) {
      console.error('Error approving student:', error);
      toast.error('Failed to approve student.');
    }
  };

  const handleRejectStudent = async (studentId, classId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/pendingStudents', {
        studentId,
        classId,
        action: 'reject',
      }, { withCredentials: true });
      console.log(response);

      // Remove the rejected student from the pending students list
      setStudents(students.filter(student => !(student._id === studentId && student.classId === classId)));

      // Show success toast
      toast.success('Student was rejected.');
    } catch (error) {
      console.error('Error rejecting student:', error);
      toast.error('Failed to reject student.');
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

  const handleCopyToClipboard = (classId) => {
    navigator.clipboard.writeText(classId)
      .then(() => {
        toast.success('ID copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy ID.');
      });
  };

  return (
    <div className="h-screen bg-blue-100 flex">
      <Navbar />
      <div className="w-3/4 pt-20 pl-8">
        <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-10rem)]">
          {classes.map((classroom) => (
            <div key={classroom._id} className="relative bg-white p-2 rounded-md shadow-md w-72 h-32 flex flex-col items-center justify-center hover:bg-blue-200 transition-colors duration-300">
              <Link onClick={() => setClassId(classroom._id)}
              to={`/classPageInstructor`} className="text-2xl absolute inset-0 flex flex-col items-center justify-center">
                {classroom.name}
              </Link>
              <button onClick={() => handleCopyToClipboard(classroom._id)} className="absolute top-2 right-2 text-gray-500 hover:text-black flex items-center">
                <span>Copy ID</span>
                <FaRegCopy className="ml-1 h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4 px-4 pt-20">
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
                    key={student._id}
                    className="text-left text-blue-600 bg-blue-100 hover:bg-blue-200 text-center text-2xl my-2 rounded-md shadow-md flex justify-between items-center"
                  >
                    <button onClick={() => handleRejectStudent(student._id, student.classId)}>
                      <XCircleIcon className="cursor-pointer h-6 w-6 hover:text-red-700" />
                    </button>
                    <div>
                      <span>{student.firstName} {student.lastName}</span>
                      <br />
                      <span className="font-bold">{student.className}</span>
                    </div>
                    <button
                      className="cursor-pointer bg-blue-600 hover:bg-green-600 text-white font-bold py-2 px-2 rounded flex items-center"
                      onClick={() => handleApproveStudent(student._id, student.classId)}
                    >
                      <FaCheck className="h-14 w-4" />
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
      <ToastContainer />
    </div>
  );
};

export default HomePageInstructor;
