import React, { useState } from 'react';

class ClassPageStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'allFiles', // Set default category
      filesByCategory: {
        allFiles: [
          { name: 'File1.pdf', date: '2024-05-10', category: 'allFiles' },
          { name: 'File2.docx', date: '2024-05-12', category: 'allFiles' },
          { name: 'File3.jpg', date: '2024-05-14', category: 'allFiles' },
          { name: 'Summary1.pdf', date: '2024-05-15', category: 'lessonSummaries' },
          { name: 'Summary2.docx', date: '2024-05-17', category: 'lessonSummaries' },
          { name: 'Summary3.jpg', date: '2024-05-19', category: 'lessonSummaries' },
          { name: 'Material1.pdf', date: '2024-05-20', category: 'studyMaterials' },
          { name: 'Material2.docx', date: '2024-05-22', category: 'studyMaterials' },
          { name: 'Material3.jpg', date: '2024-05-24', category: 'studyMaterials' },
          { name: 'Assignment1.pdf', date: '2024-05-25', category: 'assignments' },
          { name: 'Assignment2.docx', date: '2024-05-27', category: 'assignments' },
          { name: 'Assignment3.jpg', date: '2024-05-29', category: 'assignments' },
        ],
        // ... You can add more categories and files here
      },
      // ... other state properties
    };
  }

  handleCategoryChange = (newCategory) => {
    this.setState({ category: newCategory });
  };

  render() {
    const { category, filesByCategory } = this.state;
    const filteredFiles = filesByCategory[category] || [];

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row">
          {/* Content Section (65% width) */}
          <div className="flex flex-col w-2/3 p-4">
            {/* Category Buttons */}
            <div className="flex flex-row justify-between mb-4">
              <button
                className={`inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${category === 'allFiles' ? 'bg-blue-600' : ''}`}
                onClick={() => this.handleCategoryChange('allFiles')}
              >
                All Files
              </button>
              <button
                className={`inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${category === 'lessonSummaries' ? 'bg-blue-600' : ''}`}
                onClick={() => this.handleCategoryChange('lessonSummaries')}
              >
                Lesson Summaries
              </button>
              <button
                className={`inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${category === 'studyMaterials' ? 'bg-blue-600' : ''}`}
                onClick={() => this.handleCategoryChange('studyMaterials')}
              >
                Study Materials
              </button>
              <button
  className={`inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${category === 'assignments' ? 'bg-blue-600' : ''}`}
  onClick={() => this.handleCategoryChange('assignments')}
>
  Assignments
</button>
              {/* YouTube Button */}
              <button className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md mr-2">
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9. !==0H8a1 1 0 0 0-1-1V0a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 16a1 1 0 0 0 1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9zM4 3a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H4z"
                  />
                </svg>
                YouTube
              </button>
              {/* Replay Button */}
              <button className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md">
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8a3 3 0 0 0-3-3v-.5a.5.5 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-.5a.5.5 0 0 0-1-1zm5 2v8a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1z"
                    clipRule="evenodd"
                  />
                </svg>
                Replay
              </button>
            </div>

            {/* Content Display */}
            {category && (
              <div className="flex flex-wrap justify-between w-60%">  {/* Adjusted width to 60% */}
                {filteredFiles.map((file, index) => (
                  <div key={index} className="w-full md:w-1/2 p-2">
                    <div className="bg-pink-500 rounded-md p-4">
                      <div className="flex justify-between">
                        <span className="text-base font-medium">{file.name}</span>
                        <span className="text-gray-500">{file.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Chat Section (35% width, 100% height, green background) */}
          <div className="w-1/3 h-100% bg-green-500 p-4">
            <h2 className="text-lg font-bold mb-4">Chat with Teacher</h2>
            {/* Implement your chat component or placeholder here */}
            {/* ... Chat content or placeholder */}
          </div>
        </div>
      </div>
    );
  }
}

export default ClassPageStudent;