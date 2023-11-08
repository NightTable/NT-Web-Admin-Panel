import React, { useState } from 'react';
import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
// theme
import palette from '../theme/palette';

// props : textinputLabel , label ,data,
const Dropdown = ({ data, changedValue, textinputLabel }) => {
  const [valueOfDropdown, setvalueOfDropdown] = useState('');
  // console.log("props====>",props.data)
  return (
    <Autocomplete
      autoComplete
      fullWidth
      sx={{ minWidth: 100 }}
      options={data}
      getOptionLabel={(option) => (option.label ? option.label : '')}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ mr: 2, flexShrink: 0, backgroundColor: 'black' }}
          {...props}
        >
          <Typography
            sx={{
              color: '#E4D0B5',
              fontSize: 16,
              fontWeight: '600'
            }}
          >
            {option?.label}
          </Typography>
        </Box>
      )}
      // inputValue={}
      onChange={(e, values) => {
        console.log(values.label);
        setvalueOfDropdown(values.label);
        changedValue(values);
      }}
      renderInput={(params) => (
        <TextField
          value={valueOfDropdown}
          autoComplete='no-autocomplete-random-string'
          // onChange={(item) => {
          //   // console.log("item--==>", item,);
          // }}
          {...params}
          label={textinputLabel}
          inputProps={{
            ...params.inputProps,
            color: 'white',
            style: { color: palette.primary.gold }
          }}
          InputLabelProps={{
            style: { color: palette.primary.gold }
          }}
        />
      )}
    />
  );
};

Dropdown.prototype = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf]),
  changedValue: PropTypes.func,
  textinputLabel: PropTypes.string
};

export default Dropdown;
