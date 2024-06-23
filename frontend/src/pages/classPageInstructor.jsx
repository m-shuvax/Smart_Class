import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaPlay, FaEdit, FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import FilesNav from '../components/filesNav';
import Navbar from '../features/Navbar';
import InstructorChat from '../components/instructorChat';
import { useAppContext } from '../Context';

const ClassPageInstructor = () => {
  const { classId } = useParams();
  const [category, setCategory] = useState('assignments');
  const [filesByCategory, setFilesByCategory] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [showLessons, setShowLessons] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileDate, setNewFileDate] = useState(new Date().toISOString().slice(0, 10));
  const [newFileLink, setNewFileLink] = useState('');
  const [newLessonName, setNewLessonName] = useState('');
  const [newLessonDate, setNewLessonDate] = useState(new Date().toISOString().slice(0, 10));
  const [liveBroadcastLink, setLiveBroadcastLink] = useState('');
  const [isEditingBroadcast, setIsEditingBroadcast] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser, studentsList, setStudentsList ,chats, setChats} = useAppContext();

  const fetchClassData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/instructorClass/${classId}`, { withCredentials: true });
      const { files, lessons, user, chats, liveLink, students } = response.data;
      console.log('chats', chats);
      setFilesByCategory(files);
      setStudentsList(students);
      setLessons(lessons);
      setChats(chats);
      setUser(user);
      setLiveBroadcastLink(liveLink);
      setLoading(false);
    } catch (error) {
      setError('Error fetching class data');
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Class Page";
    fetchClassData();
    console.log('date:', newFileDate, newLessonDate);

    const intervalId = setInterval(() => {
      fetchClassData();
    }, 600000000);
    console.log('intervalId:', classId);

    return () => clearInterval(intervalId);
  }, []);

  const handleFileInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newFileName') setNewFileName(value);
    if (name === 'newFileDate') setNewFileDate(value);
    if (name === 'newFileLink') setNewFileLink(value)
  };

  const handleAddFile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/files', {
        fileName: newFileName,
        fileDate: newFileDate,
        category,
        classId,
        fileLink: newFileLink
      }, { withCredentials: true });
      setFilesByCategory([...filesByCategory, response.data.file]);
      setIsAddingFile(false);
    } catch (error) {
      setError('Error adding file');
    }
  };

  const handleLessonInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newLessonName') setNewLessonName(value);
    if (name === 'newLessonDate') setNewLessonDate(value);
    if (name === 'liveLink') setLiveBroadcastLink(value);
  };

  const handleAddLesson = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/lessons', {
        name: newLessonName,
        date: newLessonDate,
        classId,
        lLink: liveBroadcastLink
      }, { withCredentials: true });
      setLessons([...lessons, response.data.data]);
      setIsAddingLesson(false);
    } catch (error) {
      setError('Error adding lesson');
    }
  };  


  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`, { withCredentials: true });
      setLessons(lessons.filter(lesson => lesson._id !== lessonId));
    } catch (error) {
      setError('Error deleting lesson');
    }
  };

  const handleLinkInputChange = (event) => {
    const { value } = event.target;
    setLiveBroadcastLink(value);
  }

  const handleEditLiveBroadcastLink = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/editLiveLink`, {
        liveLink: liveBroadcastLink,
        classId
      }, { withCredentials: true });
      console.log(response.data)
      setLiveBroadcastLink(response.data.liveLink);
      setIsEditingBroadcast(false);
    } catch (error) {
      setError('Error editing live broadcast link');
    }
  };

  const handleEditButtonClick = () => {
    setIsEditingBroadcast(!isEditingBroadcast);
  };


  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/api/files/${fileId}`, { withCredentials: true });
      setFilesByCategory(filesByCategory.filter(file => file.id !== fileId));
    } catch (error) {
      console.error(error);
      setError('Error deleting file');
    }
  };


  return (
    <div className="flex flex-col h-screen bg-blue-100">
      <Navbar />
      <div className="my-14 container mx-auto px-4 pt-8">
        <div className="flex flex-row justify-between">
          <div className="flex justify-between items-center mb-4">
            {!isAddingFile && (
              <Link to="/HomePageInstructor" className="mr-20 bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded shadow-md">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back To Classrooms
              </Link>
            )}
            <div className="flex">
              {!isAddingFile && (
                <button
                  className="mx-auto bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md mr-2 h-10"
                  onClick={() => setIsAddingFile(true)}
                >
                  <FaPlus className="w-4 h-4 inline-block mr-2 mb-1" />
                  Add File
                </button>
              )}
              {isAddingFile && (
                <div className={`relative ${isAddingFile ? 'overflow-hidden h-screen' : ''}`}>
                  <dialog className="fixed inset-0 overflow-y-auto z-10" open={isAddingFile}>
                    <div className="flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-semibold mb-4">Add File</h2>
                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="File Name"
                            name="newFileName"
                            value={newFileName}
                            onChange={handleFileInputChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                          />
                          <input
                            type="date"
                            placeholder="File date"
                            name="newFileDate"
                            value={newFileDate}
                            onChange={handleFileInputChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                          />
                          <input
                            type="text"
                            placeholder="File Link"
                            name="newFileLink"
                            value={newFileLink}
                            onChange={handleFileInputChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                          />
                          <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                          >
                            <option value="lessonSummaries">lessonSummaries</option>
                            <option value="studyMaterials">studyMaterials</option>
                            <option value="assignments">assignments</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAddFile}>
                            Add
                          </button>
                          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => setIsAddingFile(false)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>

              )}
              {!isAddingFile && (
                <Link to="/StudentList" className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md h-10">
                  <FaUser className="w-4 h-4 inline-block mr-2 mb-1" />
                  Students List
                </Link>
              )}
            </div>
          </div>
        </div>

        {!isAddingFile && (
          <div className="flex flex-row">
            <div className="w-2/3 p-4 pt-0 pl-0 pr-6">
              {!isAddingLesson && (
                <FilesNav
                  category={category}
                  setCategory={setCategory}
                  setShowLessons={setShowLessons}
                  setFilteredFiles={setFilteredFiles}
                  filesByCategory={filesByCategory}
                />
              )}

              <div className="flex flex-row">
                <div className="fixed pt-32">
                  {!isAddingLesson && (
                    <div>
                      <div>
                        {isEditingBroadcast ? (
                          <input
                            type="text"
                            placeholder="Edit Live Broadcast Link"
                            name="liveLink"
                            value={liveBroadcastLink}
                            onChange={handleLinkInputChange}
                            className="border border-gray-300 rounded px-3 py-2 w-64 mr-2"
                          />
                        ) : (
                          <>
                            <button
                              className="w-40 inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md mr-2 shadow hover:bg-red-700 relative"
                              onClick={() =>
                                window.open(
                                  liveBroadcastLink
                                )
                              }
                            >
                              <FaPlay className="h-4 w-4 mr-2" />
                              Live Broadcast
                            </button>
                          </>
                        )}
                        {isEditingBroadcast && (
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow rounded-md" onClick={handleEditLiveBroadcastLink}>
                            Save
                          </button>
                        )}
                        <div>
                          <button
                            className="w-40 mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 shadow rounded-md flex items-center"
                            onClick={handleEditButtonClick}
                          >
                            <FaEdit className="h-5 w-5 mr-2" /> Edit
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          className="mt-4 w-40 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow hover:bg-gray-300"
                          onClick={() => setShowLessons(!showLessons)}
                        >
                          <FiMenu className="h-6 w-6 mr-2" />
                          <span>Recordings</span>
                        </button>
                      </div>
                      <div className="mt-4">
                        <button
                          className="w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white py-2 px-4 rounded"
                          onClick={() => setIsAddingLesson(true)}
                        >
                          <FaPlus className="mr-2" />
                          Add Lesson
                        </button>
                      </div>
                    </div>
                  )}
                  {isAddingLesson && (
                    <div className={`relative ${isAddingLesson ? 'overflow-hidden h-screen' : ''}`}>
                      <dialog className="fixed inset-0 overflow-y-auto z-10" open={isAddingLesson}>
                        <div className="flex items-center justify-center">
                          <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-xl font-semibold mb-2">Add Lesson</h2>
                            <div className="mb-4">
                              <input
                                type="text"
                                placeholder="Lesson Name"
                                name="newLessonName"
                                value={newLessonName}
                                onChange={handleLessonInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                              />
                              <input
                                type="date"
                                placeholder="Lesson Date"
                                name="newLessonDate"
                                value={newLessonDate}
                                onChange={handleLessonInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                              />
                              <input
                                type="text"
                                placeholder="Lesson Link"
                                name="liveLink"
                                value={liveBroadcastLink}
                                onChange={handleLessonInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                              />
                            </div>
                            <div className="flex justify-end">
                              <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAddLesson}>
                                Add
                              </button>
                              <button className="bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => setIsAddingLesson(false)}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  )}
                </div>
              </div>

              {!showLessons && (
                <div className="ml-52 mt-6 grow flex flex-col h-80 overflow-y-auto">
                  {filteredFiles.map((file, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center mb-4 h-14">
                      <div className="flex items-center">
                        <button onClick={() => window.open(file.fLink)}>
                          <span className="text-base text-xl underline hover:font-bold">{file.name}</span>
                        </button>
                      </div>
                      <div>
                        {category === 'allFiles' && (
                          <span className="text-sm text-gray-500 ml-2">({file.category})</span>
                        )}
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(file.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteFile(file.id)}>
                        <FaTrash className="w-4 h-4 inline-block ml-2" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showLessons && (
                <div className="ml-52 grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  {lessons.map((lesson, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
                      <div className="flex items-center">
                        <button onClick={() => window.open(lesson.lLinkd)}>
                          <span className="text-base text-xl underline hover:font-bold">{lesson.name}</span>
                        </button>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span className="text-gray-500">{new Date(lesson.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <button onClick={() => handleDeleteLesson(lesson._id)}>
                        <FaTrash className="w-4 h-4 inline-block mx-1 ml-2" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isAddingLesson && (
              <div pb-0 mb-0>
                  {<InstructorChat chats={chats}  />}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassPageInstructor;
