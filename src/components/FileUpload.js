import React, { useContext, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';

export const FileUpload = ({ moduleId }) => {
  const { setModules } = useContext(CourseContext);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setModules((prevModules) => {
        return prevModules.map((module) => {
          if (module.id === moduleId) {
            return { 
              ...module, 
              resources: [...module.resources, { id: Date.now(), name: file.name, type: file.type, file }] 
            };
          }
          return module;
        });
      });
    }
  };

  return (
    <div>
      <input type="file" id={`file-input-${moduleId}`} style={{ display: 'none' }} onChange={handleFileUpload} />
      <label htmlFor={`file-input-${moduleId}`} className="file-upload-button">
        Upload File
      </label>
      {fileName && <span className="file-name">{fileName}</span>}
    </div>
  );
};
