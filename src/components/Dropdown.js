import * as React from "react";
import { Box, Typography, TextField, Autocomplete } from "@mui/material";

//theme
import palette from "../theme/palette";

// props : textinputLabel , label ,data,
export default function Dropdown(props) {
  return (
    <Autocomplete
   
      id="country-select-demo"
      fullWidth
      sx={{ minWidth: 100 }}
      options={props.data}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ mr: 2, flexShrink: 0, backgroundColor: "black" }}
          {...props}
        >
          <Typography
            sx={{ color: "#E4D0B5", fontSize: 16, fontWeight: "600" }}
          >
            {option.label}
          </Typography>
        </Box>
      )}
     // inputValue={}
      onChange={(e,values)=>{
        console.log(values)
        props.changedValue(values)
      }}
      renderInput={(params) => (
        <TextField
          onChange={(item) => {
            console.log("item--==>", item,target.value);
          }}
          {...params}
          label={props.textinputLabel}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill,
            color: "white",
            backgroundColor: "red",
            style: { color: palette.primary.gold },
          }}
          InputLabelProps={{
            style: { color: palette.primary.gold },
          }}
        />
      )}
    />
  );
}
