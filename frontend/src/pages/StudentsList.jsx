import React, { useState } from 'react';

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
      <div className="w-2/3 bg-gray-200 p-4">
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
      
    </div>
  );
};

export default StudentList;
