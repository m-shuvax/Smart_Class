import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaEdit, FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import FilesNav from '../components/filesNav';

const ClassPageInstructor = () => {
  const [category, setCategory] = useState('assignments');
  const [filesByCategory] = useState({
    lessonSummaries: [
      { name: 'Summary1.pdf', date: '2024-05-15', category: 'lessonSummaries' },
      { name: 'Summary2.docx', date: '2028-05-17', category: 'lessonSummaries' },
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
  const [newFileName, setNewFileName] = useState('');
  const [newFileDate, setNewFileDate] = useState('');
  const [editLiveBroadcastLink, setEditLiveBroadcastLink] = useState('');
  const [isEditingBroadcast, setIsEditingBroadcast] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  
 
  const handleLiveStreamsClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
  };

  const handleReplayClick = () => {
    setShowLiveStreams(true);
    setCategory(null);
    setIsAddingLesson(false);
  };

  const handleFileInputChange = (event) => {
    if (event.target.name === 'newFileName') {
      setNewFileName(event.target.value);
    } else if (event.target.name === 'newFileDate') {
      setNewFileDate(event.target.value);
    } else if (event.target.name === 'editLiveBroadcastLink') {
      setEditLiveBroadcastLink(event.target.value);
    }
  };

  const handleAddFile = () => {
    const id = `file-${Date.now()}`;
    const newFile = { id, name: newFileName, date: newFileDate, category };
    const updatedFiles = [...filesByCategory[category], newFile];
    const updatedFilesByCategory = { ...filesByCategory, [category]: updatedFiles };
    setFilesByCategory(updatedFilesByCategory);
    setIsAddingLesson(false);
    if (addCounter >= 7) {
      setAddCounter(0);
    }
  };
  
  const handleEditLiveBroadcastLink = () => {
    // Implement logic to handle editing live broadcast link
    setIsEditingBroadcast(false);
  };

  const handleEditButtonClick = () => {
    setIsEditingBroadcast(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <div className="my-14 container mx-auto px-4 py-8">
        <div className="flex flex-row justify-between">
          {!isAddingLesson && (
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/HomePageInstructor"
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
                Back To Home Page
              </Link>
              <div className="flex">
                <button
                  className="mx-auto bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md mr-2"
                  onClick={() => setIsAddingLesson(true)}
                >
                  <FaPlus className="w-6 h-6 inline-block mr-2" />
                  Add File
                </button>
                <Link
                  to="/StudentList"
                  className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                  <FaUser className="w-6 h-6 inline-block mr-2" />
                  Students List
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row">
          <div className="w-2/3 p-4">
            <FilesNav />
            <div className="flex flex-row">
              <div className="fixed bottom-10 left-10">
                <div>
                  {isEditingBroadcast ? (
                    <input
                      type="text"
                      placeholder="Edit Live Broadcast Link"
                      name="editLiveBroadcastLink"
                      value={editLiveBroadcastLink}
                      onChange={handleFileInputChange}
                      className="border border-gray-300 rounded px-3 py-2 w-64 mr-2"
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                  {isEditingBroadcast && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleEditLiveBroadcastLink}
                    >
                      Save
                    </button>
                  )}
                  <div>
                    <button
                      className="mt-4 bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                      onClick={handleEditButtonClick}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="mt-4 w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md mr-2 shadow hover:bg-blue-700"
                    onClick={handleReplayClick}
                  >
                    <FiMenu className="h-6 w-6 mr-2" />
                    <span>Recordings</span>
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    className="w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsAddingLesson(true)}
                  >
                    <FaPlay className="mr-2" />
                    Add Lesson
                  </button>
                  {isAddingLesson && (
                    <dialog className="fixed inset-0 z-10 overflow-y-auto" open={isAddingLesson}>
                      <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                          <h2 className="text-xl font-semibold mb-4">Add Lesson</h2>
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Lesson Name"
                              name="newFileName"
                              value={newFileName}
                              onChange={handleFileInputChange}
                              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                            />
                            <input
                              type="text"
                              placeholder="Lesson Link"
                              name="newFileDate"
                              value={newFileDate}
                              onChange={handleFileInputChange}
                              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                            />
                            <select
                              name="newFileCategory"
                              value={category}
                              onChange={(event) => setCategory(event.target.value)}
                              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                            >
                              <option value="lessonSummaries">Lesson Summaries</option>
                              <option value="studyMaterials">Study Materials</option>
                              <option value="assignments">Assignments</option>
                            </select>
                          </div>
                          <div className="flex justify-end">
                            <button
                              className="bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={handleAddFile}
                            >
                              Add
                            </button>
                            <button
                              className="bg-red-600 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setIsAddingLesson(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  )}

                </div>
              </div>
            </div>

            {!showLiveStreams && (
              <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                {filteredFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <span className="text-base font-medium">{file.name}</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <span className="text-gray-500">
                        {new Date(file.date).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <button
                    //onClick={() => setIsAddingLesson(true)}
                    >
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
                    <div>
                      <span className="text-base font-medium">{stream.name}</span>
                      <span className="text-gray-500">{stream.date}</span>
                    </div>
                    <button
                    //onClick={() => setIsAddingLesson(true)}
                    >
                      <FaTrash className="w-4 h-4 inline-block mx-1" style={{ verticalAlign: 'middle' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
          {!isAddingLesson && (
          <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4 text-white">Chat with Students</h2>
            {/* Implement your chat component or placeholder here */}
            {/* ... Chat content or placeholder */}
            
            
          </div>
       )}
        </div>
        
      </div>
    </div>
  );
};

export default ClassPageInstructor;
