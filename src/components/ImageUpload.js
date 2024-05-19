import React, { useState } from "react";
import "./imageupload.scss";

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onUpload({ name: file.name, url: reader.result });
        setFile(null);
      };
    }
  };

  return (
    <div className="container">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
