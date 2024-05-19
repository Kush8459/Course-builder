import React, { useState } from 'react';

const LinkInput = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (name && url) {
      onAdd({ name, url });
      setName('');
      setUrl('');
    }
  };

  return (
    <div className='container'>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAdd}>Add Link</button>
    </div>
  );
};

export default LinkInput;
