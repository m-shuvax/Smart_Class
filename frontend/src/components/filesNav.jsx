import React, { useState } from 'react';

function FilesNav({ category, setCategory, setFilteredFiles, filesByCategory }) {

    const handleAllFilesClick = () => {
        const allFilesArray = Object.values(filesByCategory).flat();
        const sortedFiles = allFilesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        setCategory('allFiles');
        setFilteredFiles(sortedFiles);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setFilteredFiles(filesByCategory[newCategory] || []);
    };

    return (
        <div className="flex flex-row justify-between mb-4">
            <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow ${category === 'allFiles' ? 'bg-gray-300' : ''}`}
                onClick={() => handleAllFilesClick()} 
            >
                All Files
            </button>
            <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow ${category === 'lessonSummaries' ? 'bg-gray-300' : ''}`}
                onClick={() => handleCategoryChange('lessonSummaries')}
            >
                Lesson Summaries
            </button>
            <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow ${category === 'studyMaterials' ? 'bg-gray-300' : ''}`}
                onClick={() => handleCategoryChange('studyMaterials')}
            >
                Study Materials
            </button>
            <button
                className={`w-1/4 inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-md mr-2 shadow ${category === 'assignments' ? 'bg-gray-300' : ''}`}
                onClick={() => handleCategoryChange('assignments')}
            >
                Assignments
            </button>
        </div>
    );
}

export default FilesNav;
