const categorizeFiles = (lessons) => {
    
    const categories = {
      Category1: [],
      Category2: [],
      Category3: []
    };
  
    lessons.forEach(file => {
      if (categories[file.category]) {
        categories[file.category].push(file);
      }
    });
  
    return categories;
  };
  