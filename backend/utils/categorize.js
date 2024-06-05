const categorizeFiles = (lessons) => {
    
    const categories = {
      Category1: [],
      Category2: [],
      Category3: []
    };

    if (!lessons || lessons.length === 0) {
      return categories;
    }
  
    lessons.forEach(file => {
      if (categories[file.category]) {
        categories[file.category].push(file);
      }
    });

    console.log('categories', categories);
  
    return categories;
  };

  module.exports = categorizeFiles;
  