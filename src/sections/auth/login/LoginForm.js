import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
//services
import { getCountries } from "src/services/countries";
import Dropdown from "../../../components/Dropdown";
// ----------------------------------------------------------------------
import palette from "../../../theme/palette";
export default function LoginForm() {
  const navigate = useNavigate();

  const [countriesData, setcountriesData] = useState([]);
  const [phoneNumber, setphoneNumber] = useState("");
  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const getCountryCode = async () => {
    const data = await getCountries();
    let arr = [];
    data.map((item) => {
      arr.push({
        label: item.name,
        value: item.phoneNumberCode,
      });
    });
    setcountriesData(arr);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

  return (
    <>
      <Stack sx={{ paddingTop: 4 }} spacing={3}>
        <Dropdown
          textinputLabel={"Select Country"}
          data={countriesData}
          changedValue={(item) => {
            console.log("item===>", item);
            //  setcountry(item.label);
          }}
        />
        <TextField
          className={styles.textField}
          name="phone"
          label="Phone Number"
          inputProps={{
            style: { color: palette.primary.gold, backgroundColor: "black" },
          }}
          InputLabelProps={{
            style: { color: palette.primary.gold, backgroundColor: "black" },
          }}
          onChange={(event) => {
            setphoneNumber(event.target.value);
          }}
        />
      </Stack>

      <Stack sx={{ paddingTop: 4 }}></Stack>
      <LoadingButton
        fullWidth
        size="large"
        color="info"
        type="submit"
        variant="outlined"
        loadingPosition={"center"}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}

const styles = {
  root: {
    // - The TextField-root
    border: "solid 3px #0ff", // - For demonstration: set the TextField-root border
    padding: "3px", // - Make the border more distinguishable

    // (Note: space or no space after `&` matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {
      // - The Input-root, inside the TextField-root
      "& fieldset": {
        // - The <fieldset> inside the Input-root
        borderColor: "pink", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "yellow", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "green",
      },
    },
  },
};
