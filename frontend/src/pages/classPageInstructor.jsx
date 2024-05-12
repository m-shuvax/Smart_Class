import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaEdit, FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

class ClassPageInstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'assignments', // Set default category
      filesByCategory: {
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
      },
      filteredFiles: [],
      liveStreams: [
        { name: 'Lesson 1', date: '2024-05-10' },
        { name: 'Lesson 2', date: '2024-05-12' },
        { name: 'Lesson 3', date: '2024-05-14' },
      ],
      showLiveStreams: false,
      newFileName: '',
      newFileCategory: '',
      newFileDate: '',
      editLiveBroadcastLink: '',
      newRecurringBroadcast: '',
      isEditingBroadcast: false,
      isAddingLesson: false,
      addCounter: 0,
    };
  }

  handleCategoryChange = (newCategory) => {
    const { filesByCategory } = this.state;
    this.setState({
      category: newCategory,
      filteredFiles: filesByCategory[newCategory] || [],
      showLiveStreams: false, // Hide live streams when changing category
    });
  };

  handleAllFilesClick = () => {
    const { filesByCategory } = this.state;
    const allFilesArray = Object.values(filesByCategory)
      .filter((category) => category !== filesByCategory.liveStreams)
      .flat();
    const sortedFiles = allFilesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.setState({ category: 'allFiles', filteredFiles: sortedFiles, showLiveStreams: false });
  };

  handleLiveStreamsClick = () => {
    this.setState({ showLiveStreams: true, category: null });
  };

  handleReplayClick = () => {
    this.setState({ showLiveStreams: true, category: null, isAddingLesson: false });
  };

  handleFileInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddFile = () => {
    const { newFileName, newFileCategory, newFileDate, filesByCategory, addCounter } = this.state;
    const id = `file-${Date.now()}`;
    const newFile = { id, name: newFileName, date: newFileDate, category: newFileCategory };
    const updatedFiles = [...filesByCategory[newFileCategory], newFile];
    const updatedFilesByCategory = { ...filesByCategory, [newFileCategory]: updatedFiles };
    this.setState(
      (prevState) => ({
        filesByCategory: updatedFilesByCategory,
        isAddingLesson: false,
        addCounter: prevState.addCounter + 1,
      }),
      () => {
        if (this.state.addCounter >= 7) {
          this.setState({ addCounter: 0 });
        }
      }
    );
  };

  handleEditLiveBroadcastLink = () => {
    const { editLiveBroadcastLink } = this.state;
    // Implement logic to handle editing live broadcast link
    this.setState({ isEditingBroadcast: false });
  };

  handleAddRecurringBroadcast = () => {
    const { newRecurringBroadcast } = this.state;
    // Implement logic to handle adding recurring broadcast
  };

  handleEditButtonClick = () => {
    this.setState({ isEditingBroadcast: true });
  };

  render() {
    const {
      category,
      filteredFiles,
      liveStreams,
      showLiveStreams,
      newFileName,
      newFileDate,
      editLiveBroadcastLink,
      isEditingBroadcast,
      isAddingLesson,
    } = this.state;
    return (
      <div className={`flex flex-col min-h-screen ${isAddingLesson ? '' : 'bg-blue-100'}`}>
        <div className="my-14 container mx-auto px-4 py-8">
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
                  onClick={() => this.setState({ isAddingLesson: true })}
                >
                  <FaPlus className="w-6 h-6 inline-block mr-2" />
                  Add File
                </button>
                <button
                  className="mx-auto bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md"
                  //onClick={() => this.setState({ isAddingLesson: true })}
                >
                  <FaTrash className="w-6 h-6 inline-block mr-2" />
                  Delete File
                </button>
              </div>
              <div className="flex">
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
          <div className="flex flex-row">
            {!isAddingLesson && (
              <div className="w-2/3 p-4">
                <div className="flex flex-row justify-between mb-4">
                  <button
                    className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${category === 'allFiles' ? 'bg-indigo-700' : ''
                      }`}
                    onClick={this.handleAllFilesClick}
                  >
                    All Files
                  </button>
                  <button
                    className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${category === 'lessonSummaries' ? 'bg-indigo-700' : ''
                      }`}
                    onClick={() => this.handleCategoryChange('lessonSummaries')}
                  >
                    Lesson Summaries
                  </button>
                  <button
                    className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${category === 'studyMaterials' ? 'bg-indigo-700' : ''
                      }`}
                    onClick={() => this.handleCategoryChange('studyMaterials')}
                  >
                    Study Materials
                  </button>
                  <button
                    className={`w-1/4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 shadow ${category === 'assignments' ? 'bg-indigo-700' : ''
                      }`}
                    onClick={() => this.handleCategoryChange('assignments')}
                  >
                    Assignments
                  </button>
                </div>
                <div className="flex flex-row">
                  <div className="fixed bottom-10 left-10">
                    <div>
                      {isEditingBroadcast ? (
                        <input
                          type="text"
                          placeholder="Edit Live Broadcast Link"
                          name="editLiveBroadcastLink"
                          value={editLiveBroadcastLink}
                          onChange={this.handleFileInputChange}
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
                          onClick={this.handleEditLiveBroadcastLink}
                        >
                          Save
                        </button>
                      )}
                      <div>
                        <button
                          className="mt-4 bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                          onClick={this.handleEditButtonClick}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        className="mt-4 w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md mr-2 shadow hover:bg-blue-700"
                        onClick={this.handleReplayClick}
                      >
                        <FiMenu className="h-6 w-6 mr-2" />
                        <span>Recordings</span>
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="w-40 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => this.setState({ isAddingLesson: true })}
                      >
                        <FaPlay className="mr-2" />
                        Add Lesson
                      </button>
                    </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            )}
            {isAddingLesson && (
              <div className="w-2/3 p-4">
                <div className="mt-4 ml-80">
                  <input
                    type="text"
                    placeholder="Lesson Name"
                    name="newFileName"
                    value={newFileName}
                    onChange={this.handleFileInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-1/2 mr-2 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Lesson Link"
                    name="newFileDate"
                    value={newFileDate}
                    onChange={this.handleFileInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-1/2 mr-2 mb-2"
                  />
                  <select
                    name="newFileCategory"
                    value={this.state.newFileCategory}
                    onChange={this.handleFileInputChange}
                    className="border border-gray-300 rounded px-3 w-1/2 py-2 mr-2 mb-2"
                  >
                    <option value="lessonSummaries">Lesson Summaries</option>
                    <option value="studyMaterials">Study Materials</option>
                    <option value="assignments">Assignments</option>
                  </select>
                  <button
                    className="bg-blue-600 text-white font-bold py-2 w-1/2 px-4 rounded"
                    onClick={() => {
                      this.handleAddFile();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-4 text-white">Chat with Students</h2>
              {/* Implement your chat component or placeholder here */}
              {/* ... Chat content or placeholder */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default ClassPageInstructor;
