import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="image-upload">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="mb-4"
      />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" className="w-32 h-32 object-cover rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
