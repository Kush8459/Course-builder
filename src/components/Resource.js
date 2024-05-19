import React, { useContext, useState } from 'react';
import { FiTrash, FiEdit, FiSave } from 'react-icons/fi';
import { CourseContext } from '../contexts/CourseContext';
import './Resource.css';

export const Resource = ({ resource, moduleIndex, resourceIndex }) => {
  const { setModules } = useContext(CourseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [resourceName, setResourceName] = useState(resource.name);
  const [resourceUrl, setResourceUrl] = useState(resource.url);

  const deleteResource = () => {
    setModules((prevModules) => {
      return prevModules.map((mod, idx) => {
        if (idx === moduleIndex) {
          return {
            ...mod,
            resources: mod.resources.filter((res, rIdx) => rIdx !== resourceIndex),
          };
        }
        return mod;
      });
    });
  };

  const saveResource = () => {
    setModules((prevModules) => {
      return prevModules.map((mod, idx) => {
        if (idx === moduleIndex) {
          return {
            ...mod,
            resources: mod.resources.map((res, rIdx) => {
              if (rIdx === resourceIndex) {
                return { ...res, name: resourceName, url: resourceUrl };
              }
              return res;
            }),
          };
        }
        return mod;
      });
    });
    setIsEditing(false);
  };

  const renderResource = () => {
    const fileType = resource.url.split('.').pop().toLowerCase();
    if (fileType === 'pdf') {
      return <embed src={resource.url} type="application/pdf" width="100%" height="600px" />;
    } else if (fileType.match(/(jpg|jpeg|png|gif)$/)) {
      return <img src={resource.url} alt={resource.name} />;
    } else {
      return <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>;
    }
  };

  return (
    <div className="resource">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
          />
          <input
            type="text"
            value={resourceUrl}
            onChange={(e) => setResourceUrl(e.target.value)}
          />
        </div>
      ) : (
        renderResource()
      )}
      <div className="resource-actions">
        {isEditing ? (
          <FiSave onClick={saveResource} />
        ) : (
          <FiEdit onClick={() => setIsEditing(true)} />
        )}
        <FiTrash onClick={deleteResource} />
      </div>
    </div>
  );
};
