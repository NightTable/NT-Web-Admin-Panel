import React, { useState } from "react";
import { Box, Typography, TextField, Autocomplete } from "@mui/material";

//theme
import palette from "../theme/palette";

// props : textinputLabel , label ,data,
export default function Dropdown(props) {
  const [valueOfDropdown, setvalueOfDropdown] = useState("");
  // console.log("props====>",props.data)
  return (
    <Autocomplete
    autoComplete={true}
      fullWidth
      sx={{ minWidth: 100 }}
      options={props.data}
      getOptionLabel={(option) => (option.label ? option.label : "")}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ mr: 2, flexShrink: 0, backgroundColor: "black" }}
          {...props}
        >
          <Typography
            sx={{
              color: "#E4D0B5", 
            fontSize: 16,
             fontWeight: "600" }}
          >
            {option?.label}
          </Typography>
        </Box>
      )}
      // inputValue={}
      onChange={(e, values) => {
        console.log(values.label);
        setvalueOfDropdown(values.label);
        props.changedValue(values);
      }}
      renderInput={(params) => (
        <TextField
        value={valueOfDropdown}

          autoComplete="no-autocomplete-random-string"
          onChange={(item) => {
            // console.log("item--==>", item,);
          }}
          {...params}
          label={props.textinputLabel}
          inputProps={{
            ...params.inputProps,
            color: "white",
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