import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";

export default function ResponsiveDateTimePickers(props) {
  // const currentDateinISO5601 = dayjs().format("YYYY-MM-DDTHH:MM");

  const [value, setValue] = React.useState(dayjs(props?.value));
  const inputStyle = {
    color: "#E4D0B5",
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        <MobileDateTimePicker
          sx={{
            "& .MuiInputBase-input": inputStyle,
          }}
          label="Choose Date and Time"
          value={value}
          onChange={(newValue) => {
            console.log(dayjs(newValue).valueOf(), "newValue=>");
            setValue(newValue);
            props.onChange(dayjs(newValue).valueOf());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
