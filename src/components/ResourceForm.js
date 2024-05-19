import React, { useContext, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';

export const ResourceForm = ({ moduleId }) => {
  const { setModules } = useContext(CourseContext);
  const [resourceName, setResourceName] = useState('');

  const addResource = () => {
    setModules((prevModules) => {
      const newModules = prevModules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, resources: [...module.resources, { id: Date.now(), name: resourceName }] };
        }
        return module;
      });
      return newModules;
    });
    setResourceName('');
  };

  return (
    <div>
      <input type="text" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
      <button onClick={addResource}>Add Resource</button>
    </div>
  );
};
