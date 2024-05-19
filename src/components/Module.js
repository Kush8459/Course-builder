import React, { useContext, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import { Resource } from './Resource';
import { useDrop } from 'react-dnd';
import { FiTrash, FiEdit, FiSave } from 'react-icons/fi';
import './Module.css'; // Ensure you have a corresponding CSS file for styling

export const Module = ({ module, index }) => {
  const { setModules } = useContext(CourseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const [{ isOver }, drop] = useDrop({
    accept: 'RESOURCE',
    drop: (item) => moveResource(item, module.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveResource = (resource, moduleId) => {
    setModules((prevModules) => {
      const newModules = prevModules.map((mod) => {
        if (mod.id === moduleId) {
          return { ...mod, resources: [...mod.resources, resource] };
        }
        return { ...mod, resources: mod.resources.filter((res) => res.id !== resource.id) };
      });
      return newModules;
    });
  };

  const deleteModule = () => {
    setModules((prevModules) => prevModules.filter((mod) => mod.id !== module.id));
  };

  const saveModuleName = () => {
    setModules((prevModules) => {
      return prevModules.map((mod) => {
        if (mod.id === module.id) {
          return { ...mod, name: moduleName };
        }
        return mod;
      });
    });
    setIsEditing(false);
  };

  return (
    <div ref={drop} className={`module ${isOver ? 'is-over' : ''}`}>
      <div className="module-header">
        {isEditing ? (
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onBlur={saveModuleName}
            onKeyPress={(e) => e.key === 'Enter' && saveModuleName()}
          />
        ) : (
          <h3>{module.name}</h3>
        )}
        <div className="module-actions">
          {isEditing ? (
            <FiSave className="module-action-icon" onClick={saveModuleName} />
          ) : (
            <FiEdit className="module-action-icon" onClick={() => setIsEditing(true)} />
          )}
          <FiTrash className="module-action-icon" onClick={deleteModule} />
        </div>
      </div>
      <div className="module-resources">
        {module.resources.map((resource, idx) => (
          <Resource key={resource.id} resource={resource} moduleIndex={index} resourceIndex={idx} />
        ))}
      </div>
    </div>
  );
};
