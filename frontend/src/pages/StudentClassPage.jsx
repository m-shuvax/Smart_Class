import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlay } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import FilesNav from '../components/filesNav';
import Navbar from '../features/Navbar';
import Chat from '../components/chat';
import { useAppContext } from '../Context';


const StudentClassPage = () => {
  const { user, setUser, classId, setClassId } = useAppContext();
  const [data, setData] = useState({
    files: [],
    lessons: [],
    userDetails: null,
    chat: null,
    liveLink: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('assignments');
  const [filesByCategory, setFilesByCategory] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [showLessons, setShowLessons] = useState(false);

  useEffect(() => {
    document.title = "Class Page";
  }, []);

  const fetchClassData = async () => {
    try {
      console.log(classId, 777);
      const response = await axios.get(`http://localhost:5000/api/studentClass/${classId}`, { withCredentials: true });
      console.log(response.data);
      const { files, lessons, user, chat, liveLink } = response.data;
      setData({ files, lessons, user, chat, liveLink });
      setLoading(false);
      setFilesByCategory(files);
      setUser(user);
    } catch (error) {
      console.error(error);
      setError('Error fetching class data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchClassData();

    // Set interval to fetch data every minute
    const intervalId = setInterval(() => {
      fetchClassData();
    }, 6000000000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [classId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { files, lessons, chat, liveLink } = data;
  console.log('files:', files, 'lessons:', lessons, 'chat:', chat, 'liveLink:', liveLink);

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <Navbar />
      <div className="container mx-auto pt-24 pl-4">
        <Link
          to="/HomePageStudent"
          className="mr-20 bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded shadow-md"
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
          Back To Classrooms
        </Link>

        <div className="flex flex-row">
          <div className="w-2/3 p-4 pt-6 pl-0 pr-9">
            <FilesNav
              category={category}
              setCategory={setCategory}
              setShowLessons={setShowLessons}
              setFilteredFiles={setFilteredFiles}
              filesByCategory={filesByCategory}
            />

            <div className="flex flex-row">
              <div className="fixed bottom-9">
                <div>
                  <button
                    className="w-40 inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md mr-2 shadow hover:bg-red-700 relative"
                    onClick={() =>
                      window.open(liveLink)
                    }
                  >
                    <FaPlay className="h-4 w-4 mr-2" />
                    Live Broadcast
                  </button>
                </div>
                <div className="mt-0.5">
                  <button
                    className="mt-4 w-40 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow hover:bg-gray-300"
                    onClick={() => setShowLessons(!showLessons)}
                  >
                    <FiMenu className="h-6 w-6 mr-2" />
                    <span>Recordings</span>
                  </button>
                </div>
              </div>
              {!showLessons && (
                <div className="ml-52 mt-6 grow flex flex-col h-80 overflow-y-auto">
                  {filteredFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center mb-4 h-14"
                    >
                      <div className="flex items-center"
                        onClick={window.open(file.fLink)}>
                        <span className="text-base font-medium">{file.name}</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(file.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteFile(file._id)}>
                        <FaTrash className="w-4 h-4 inline-block" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showLessons && (
                <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  {lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="text-base font-medium">{lesson.name}</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(lesson.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteLiveStream(lesson._id)}>
                        <FaTrash className="w-4 h-4 inline-block mx-1" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4 text-white">Chat with Teacher</h2>
            <Chat
              chat={chat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassPage;
