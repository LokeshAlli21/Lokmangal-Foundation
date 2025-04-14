import React, { useState } from 'react';

const ImageUploader = ({ onImageSelect , onImageSubmit}) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageSelect(file); // Pass the file to parent component if needed
    }
  };

  const handleImageSubmit = () => {
    onImageSubmit()
  }

  return (
    <>
    <div className="form-group" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', }}>
    <label className="lb">Uplaod Profile Photo :</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
        style={{width: '100%'}}
      />
    </div>
    <div className="form-group">
        {preview && (
        <img
          src={preview}
          alt="Selected Preview"
          className="w-40 h-40 object-cover rounded shadow"
          style={{width: '200px', maxHeight: '300px'}}
        />
      )}
    </div>
    {preview && 
    <div className="form-group">
        <button type="button" className='form-control btn btn-success mt-2' onClick={handleImageSubmit} >Submit image</button>
    </div>}
    </>
  );
};

export default ImageUploader;
