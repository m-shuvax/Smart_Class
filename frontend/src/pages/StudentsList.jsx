import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // חשוב לייבא את ה-Link מהריאקט ראוטר כדי להשתמש בו

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, firstName: 'Abigail', lastName: 'Cohen', email: 'r0527135949@gmail.com', phoneNumber: '0552759894'},
    { id: 2, firstName: 'Uri', lastName: 'Levy', email: 'm0527657776@gmail.com', phoneNumber: '0627657776' },
    { id: 3, firstName: 'Michael', lastName: 'Golan', email: 'tr0526696507@gmail.com', phoneNumber: '0526696507' },
    { id: 3, firstName: 'Binyomin', lastName: 'Zaiddman', email: 23, phoneNumber: '58378634789' },
    { id: 3, firstName: 'Meir', lastName: 'Noishtut', email: 23, phoneNumber: '246346' },
    { id: 3, firstName: 'Menachem', lastName: 'Shubkas', email: 23, phoneNumber: '05265752696507' },
    // and so on...
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="flex mt-16 bg-blue-100 h-screen">
      
      <div className="w-1/3 bg-blue-200 p-4 h-full">
        <Link
          to="/classPageInstructor" // הוספתי קישור לדף המתאים
          className="mr-20 flex items-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-md w-1/2"
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
          To class Page
        </Link>
        <h2 className="text-xl font-bold mb-2">List Of Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => handleStudentClick(student)} className="cursor-pointer text-blue-400 hover:text-blue-600 bg-blue-100 hover:bg-blue-200 text-center text-2xl my-2 rounded-md shadow-md">
              {student.firstName} {student.lastName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 p-4 h-full">
        {selectedStudent && (
          <div className="p-4 mt-4">
            <h2 className="text-xl font-bold">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
            <p><strong>email</strong>: {selectedStudent.email}</p>
            <p><strong>phoneNumber</strong>: {selectedStudent.phoneNumber}</p>
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
