// ClassroomCard.jsx
import React from 'react';

const ClassroomCard = ({ classroom }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{classroom.name}</h2>
      <p className="text-gray-600 mb-1">Teacher: {classroom.teacher}</p>
      <p className="text-gray-600">Students: {classroom.students.join(', ')}</p>
    </div>
  );
};

export default ClassroomCard;
