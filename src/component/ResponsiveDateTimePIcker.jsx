import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  label: {
    color: 'red' // Change the label color here
  }
});

export default function ResponsiveDateTimePickers(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(dayjs(props?.value));
  const inputStyle = {
    color: '#E4D0B5',
    labelColor:'#E4D0B5'
  };
  const labelStyle = {
    color: 'red' // Change the label color here
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        <MobileDateTimePicker
          sx={{
            '& .MuiInputBase-input': inputStyle
          }}
          InputLabelProps={{
            style: {
              color: 'red' // Change the label color here
            }
          }}
          label='Choose Date and Time'
         
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            props.onChange(dayjs(newValue).valueOf());
          }}
          renderInput={(params) => (
            <div>
                <input {...props.inputProps} />
                <TextField {...params} />
              </div>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
