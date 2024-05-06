// ClassroomList.jsx
import React from 'react';
import ClassroomCard from './ClassroomCard';

const ClassroomList = ({ classrooms }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
};

export default ClassroomList;
