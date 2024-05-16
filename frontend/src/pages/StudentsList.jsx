import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // חשוב לייבא את ה-Link מהריאקט ראוטר כדי להשתמש בו

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, firstName: 'Abigail', lastName: 'Cohen', age: 25 },
    { id: 2, firstName: 'Uri', lastName: 'Levy', age: 22 },
    { id: 3, firstName: 'Michael', lastName: 'Golan', age: 23 },
    // and so on...
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="flex mt-20">
      <div className="w-1/3 bg-gray-200 p-4">
        <Link
          to="/classPageInstructor" // הוספתי קישור לדף המתאים
          className="mr-20 flex items-center bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded shadow-md"
        >
          <svg
            className="w-6 h-6 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back To class Page
        </Link>
        <h2 className="text-xl font-bold mb-2">List Of Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => handleStudentClick(student)} className="cursor-pointer hover:text-blue-600">
              {student.firstName} {student.lastName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-2">Chat with Teacher</h2>
        {/* Here goes the chat with the teacher */}
        {selectedStudent && (
          <div className="bg-white p-4 mt-4">
            <h2 className="text-xl font-bold">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
            <p>Age: {selectedStudent.age}</p>
            {/* Additional details about the student can be added here */}
          </div>
        )}
      </div>
      <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4 text-white">Chat with Teacher</h2>
        {/* Implement your chat component or placeholder here */}
        {/* ... Chat content or placeholder */}
      </div>
    </div>
  );
};

export default StudentList;
