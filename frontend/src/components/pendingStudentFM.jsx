import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SendPendingStudant = () => {
  const location = useLocation();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const classId = queryParams.get('classId');
  const studentId = queryParams.get('studentId');
  const action = queryParams.get('action');

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/pendingStudents', {
          classId,
          studentId,
          action
        }, {withCredentials: true}
    );
        console.log('Data sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (classId && studentId && action) {
      sendDataToServer();
    }
  }, [location]);

  return (
    <div>
      Sending data to server...
    </div>
  );
};

export default SendPendingStudant;
