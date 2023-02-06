import * as React from 'react';
import { Box, Typography, TextField, Autocomplete } from '@mui/material';

// props : textinputLabel , label ,data,
export default function Dropdown(props) {
  return (
    <Autocomplete
      id="country-select-demo"
      fullWidth
      sx={{ minWidth:100}}
      options={props.data}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ mr: 2, flexShrink: 0,  backgroundColor: 'black',  }} {...props}>
          <Typography sx={{color: '#E4D0B5', fontSize: 16, fontWeight: '600' }} >
            {option.label}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField

          {...params}
          label={props.textinputLabel}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill,
            color:'white',
            backgroundColor:'red'
          }}
        />
      )}
    />
  );
}
