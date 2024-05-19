import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = {
      id: uuidv4(),
      name: `Module ${modules.length + 1}`,
      resources: [],
    };
    setModules([...modules, newModule]);
  };

  return (
    <CourseContext.Provider value={{ modules, setModules, addModule }}>
      {children}
    </CourseContext.Provider>
  );
};
