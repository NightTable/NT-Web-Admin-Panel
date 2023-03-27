import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

const AddClub = () => {
  const [keyValuePairs, setKeyValuePairs] = useState({});
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAddKeyValue = () => {
    setKeyValuePairs({ ...keyValuePairs, [key]: value });
    setKey('');
    setValue('');
  };

  return (
    <div>
      <TextField
        label="Key"
        value={key}
        onChange={(event) => setKey(event.target.value)}
      />
      <TextField
        label="Value"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button onClick={handleAddKeyValue}>Add Key-Value Pair</Button>
      {Object.entries(keyValuePairs).map(([key, value]) => (
        <Typography key={key}>
          {key}: {value}
        </Typography>
      ))}
    </div>
  );
};

export default AddClub;
