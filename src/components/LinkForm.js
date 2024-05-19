import React, { useContext, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';

export const LinkForm = ({ moduleId }) => {
  const { setModules } = useContext(CourseContext);
  const [link, setLink] = useState('');

  const addLink = () => {
    setModules((prevModules) => {
      const newModules = prevModules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, resources: [...module.resources, { id: Date.now(), link }] };
        }
        return module;
      });
      return newModules;
    });
    setLink('');
  };

  return (
    <div>
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
      <button onClick={addLink}>Add Link</button>
    </div>
  );
};
