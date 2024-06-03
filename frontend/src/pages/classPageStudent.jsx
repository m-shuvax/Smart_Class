import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlay} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import FilesNav from '../components/filesNav';
import Navbar from '../features/Navbar';
import Chat from '../components/chat';

const ClassPageStudent = () => {
  const [category, setCategory] = useState('assignments');
  const [filesByCategory] = useState({
    lessonSummaries: [
      { name: 'Summary1.pdf', date: '2024-05-15', category: 'lessonSummaries' },
      { name: 'Summary2.docx', date: '2024-05-17', category: 'lessonSummaries' },
      { name: 'Summary3.jpg', date: '2024-05-19', category: 'lessonSummaries' },
    ],
    studyMaterials: [
      { name: 'Material1.pdf', date: '2024-05-20', category: 'studyMaterials' },
      { name: 'Material2.docx', date: '2024-05-22', category: 'studyMaterials' },
      { name: 'Material3.jpg', date: '2024-05-24', category: 'studyMaterials' },
    ],
    assignments: [
      { name: 'Assignment1.pdf', date: '2024-05-25', category: 'assignments' },
      { name: 'Assignment2.docx', date: '2024-05-27', category: 'assignments' },
      { name: 'Assignment3.jpg', date: '2024-05-29', category: 'assignments' },
    ],
    liveStreams: [
      { name: 'Lesson 1', date: '2024-05-25', category: 'liveStreams' },
      { name: 'Lesson 2', date: '2024-05-27', category: 'liveStreams' },
      { name: 'Lesson 3', date: '2024-05-29', category: 'liveStreams' },
    ],
  });
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [liveStreams] = useState([
    { name: 'Lesson 1', date: '2024-05-10' },
    { name: 'Lesson 2', date: '2024-05-12' },
    { name: 'Lesson 3', date: '2024-05-14' },
  ]);
  const [showLiveStreams, setShowLiveStreams] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  useEffect(() => {
    document.title = "Class Page";
  }, []);

  const handleFileInputChange = (event) => {
    if (event.target.name === 'newFileName') {
      setNewFileName(event.target.value);
    } else if (event.target.name === 'newFileDate') {
      setNewFileDate(event.target.value);
    } else if (event.target.name === 'editLiveBroadcastLink') {
      setEditLiveBroadcastLink(event.target.value);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setFilteredFiles(filesByCategory[newCategory] || []);
    setShowLiveStreams(false);
  };

  const handleAllFilesClick = () => {
    const allFilesArray = Object.values(filesByCategory)
      .filter(category => category !== filesByCategory.liveStreams)
      .flat();
    const sortedFiles = allFilesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    setCategory('allFiles');
    setFilteredFiles(sortedFiles);
  };

  const handleLiveStreamsClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
  };

  const handleReplayClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
  };

  const [selectedCategory, setSelectedCategory] = useState('Lesson Summaries');

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
            {!isAddingLesson && (<FilesNav
              category={category}
              setCategory={setCategory}
              setShowLiveStreams={setShowLiveStreams}
              setFilteredFiles={setFilteredFiles}
              filesByCategory={filesByCategory}
            />
            )}
            <div className="flex flex-row">
              <div className="fixed bottom-9">
                <div>
                  <button
                    className="w-40 inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md mr-2 shadow hover:bg-red-700 relative"
                    onClick={() =>
                      window.open(
                        editLiveBroadcastLink ||
                        'https://admin-ort-org-il.zoom.us/j/88968548572?pwd=QXNUWm9TVSsrT1dUZGNpYURSOXRKZz09#success'
                      )
                    }
                  >
                    <FaPlay className="h-4 w-4 mr-2" />
                    Live Broadcast
                  </button>
                </div>
                <div className="mt-0.5">
                <button
                        className="mt-4 w-40 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow hover:bg-gray-300"
                        onClick={() => setShowLiveStreams(!showLiveStreams)}
                      >
                        <FiMenu className="h-6 w-6 mr-2" />
                        <span>Recordings</span>
                      </button>
                </div>
              </div>
              {!showLiveStreams && (
                <div className="ml-52 mt-6 grow flex flex-col h-80 overflow-y-auto">
                  {filteredFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center mb-4 h-14"
                    >
                      <div className="flex items-center">
                        <span className="text-base font-medium">{file.name}</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(file.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteFile(file.id)}>
                        <FaTrash className="w-4 h-4 inline-block" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showLiveStreams && (
                <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  {liveStreams.map((stream, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="text-base font-medium">{stream.name}</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(stream.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteLiveStream(stream.id)}>
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
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPageStudent;