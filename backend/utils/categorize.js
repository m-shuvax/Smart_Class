const categorizeFiles = (lessons) => {

  const categories = {
    lessonSummaries: [],
    studyMaterials: [],
    assignments: []
  };

  if (!lessons || lessons.length === 0) {
    return categories;
  }

  lessons.forEach(file => {
    categories[file.category].push(file);
  }
  );

  console.log('categories', categories);

  return categories;
};

module.exports = categorizeFiles;
