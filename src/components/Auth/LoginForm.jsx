import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Stack, TextField, Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
//services
import { getCountries } from "src/services/countries";
import { loginApi, otpVerify } from "src/services/auth";
import Dropdown from "../Dropdown";
// ----------------------------------------------------------------------
import palette from "../../theme/palette";
import OtpInput from "react-otp-input";

export default function LoginForm() {
  const navigate = useNavigate();

  const [countriesData, setcountriesData] = useState([]);
  const [phoneNumber, setphoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [otp, setotp] = useState("");
  const [otpField, setotpField] = useState(true);

  useEffect(() => {
    getCountryCode();
  }, []);

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

  //get otp
  const handleClick = async () => {
    if (countryCode.length <= 0) {
      alert("Please enter the country code");
    } else if (phoneNumber.length <= 0) {
      alert("Please enter the valid number ");
    } else {
      const no = `+${countryCode}${phoneNumber}`;
      const triggerOtp = await loginApi(no);
      console.log("triggerOtp===>", triggerOtp);
      if (triggerOtp?.status === undefined) {
        alert("Something went wrong ");
      } else if (triggerOtp?.status === true) {
        setotpField(true);
      }
    }

    //navigate("/dashboard", { replace: true });
  };

  //verify otp
  const verifyOtp = async () => {
    const no = `+${countryCode}${phoneNumber}`;
    if (otp >= 4) {
      const verifyNumber = await otpVerify(no, otp);
      console.log("verifyNumber---->", verifyNumber);
    }
  };
  return (
    <>
      {otpField === true ? (
        <Stack sx={{ paddingTop: 4 }} spacing={3}>
          <Dropdown
            textinputLabel={"Select Country"}
            data={countriesData}
            changedValue={(item) => {
              console.log("item===>", item);
              //  setcountry(item.label);
              setcountryCode(item.value);
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
      ) : (
        <>
          <Stack sx={{ paddingTop: 4, width: "100%" }} spacing={3}>
            <OtpInput
              inputStyle={{
                width: "100%",
                height: 70,
              }}
              containerStyle={{
                width: "100%",
              }}
              focusStyle={{
                backgroundColor: "#E4D0B5",
              }}
              value={otp}
              onChange={(text) => {
                setotp(text);
              }}
              numInputs={4}
              separator={<span>-</span>}
            />
          </Stack>
        </>
      )}

      <Stack sx={{ paddingTop: 4 }}></Stack>
      <LoadingButton
        style={{
          color: "black",
          backgroundColor: "#E4D0B5",
        }}
        fullWidth
        size="large"
        color="info"
        type="submit"
        variant="outlined"
        onClick={() => (otpField === false ? handleClick() : verifyOtp())}
      >
        {otpField === true ? "Login" : "Verify Otp"}
      </LoadingButton>
      {otpField === true ? (
        <></>
      ) : (
        <>
          <Box
            style={{
              paddingTop: 14,
              alignItems: "flex-end",
            }}
          >
            <Button
              style={{
                color: "#E4D0B5",
              }}
              type="submit"
              variant="text"
              onClick={() => setotpField(true)}
            >
              Change Number
            </Button>
          </Box>
        </>
      )}
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
