import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../features/Navbar';

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
    setShowLiveStreams(false);
  };

  const handleLiveStreamsClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
  };

  const handleReplayClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <Navbar />
      <div className="my-24 container mx-auto px-4 py-8">
        <Link
          to="/HomePageStudent"
          className="fixed top-12 my-10 mx-auto mb-8 bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded shadow-md"
        >
          <svg
            className="w-6 h-6 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back To Home Page
        </Link>

        <div className="flex flex-row">
          <div className="w-2/3 p-4">
            <div className="flex flex-row justify-between mb-4">
              <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${
                  category === 'allFiles' ? 'bg-indigo-700' : ''
                }`}
                onClick={handleAllFilesClick}
              >
                All Files
              </button>
              <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${
                  category === 'lessonSummaries' ? 'bg-indigo-700' : ''
                }`}
                onClick={() => handleCategoryChange('lessonSummaries')}
              >
                Lesson Summaries
              </button>
              <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${
                  category === 'studyMaterials' ? 'bg-indigo-700' : ''
                }`}
                onClick={() => handleCategoryChange('studyMaterials')}
              >
                Study Materials
              </button>
              <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${
                  category === 'assignments' ? 'bg-indigo-700' : ''
                }`}
                onClick={() => handleCategoryChange('assignments')}
              >
                Assignments
              </button>
            </div>
            <div className="flex flex-row">
              <div className="fixed bottom-10 left-10">
                <div>
                  <button
                    className="w-40 inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md mr-2 shadow hover:bg-red-700"
                    onClick={() =>
                      window.open(
                        'https://admin-ort-org-il.zoom.us/j/88968548572?pwd=QXNUWm9TVSsrT1dUZGNpYURSOXRKZz09#success'
                      )
                    }
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 8a3 3 0 0 0-3-3v-.5a.5.5 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-.5a.5.5 0 0 0-1-1zm5 2v8a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Live Broadcast
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    className="w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    onClick={handleReplayClick}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 8a3 3 0 0 0-3-3v-.5a.5.5 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-.5a.5.5 0 0 0-1-1zm5 2v8a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Replay
                  </button>
                </div>
              </div>
              {!showLiveStreams && (
                <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  {filteredFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between">
                        <span className="text-base font-medium">{file.name}</span>
                        <span className="text-gray-500">{file.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showLiveStreams && (
                <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  {liveStreams.map((stream, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between">
                        <span className="text-base font-medium">{stream.name}</span>
                        <span className="text-gray-500">{stream.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4 text-white">Chat with Teacher</h2>
            {/* Implement your chat component or placeholder here */}
            {/* ... Chat content or placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPageStudent;
