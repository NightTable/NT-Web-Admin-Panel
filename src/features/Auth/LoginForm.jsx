import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
//services
import { getCountries } from "src/services/countries";
import { loginApi, otpVerify } from "src/services/auth";
import { getProfileData } from "src/services/representative";
import Dropdown from "../../component/Dropdown";
// ----------------------------------------------------------------------
import palette from "../../theme/palette";
import OtpInput from "react-otp-input";
import { LocalStorageKey } from "src/utils/localStorage/keys";

export default function LoginForm() {
  const navigate = useNavigate();
  //loader
  const [loader, setloader] = useState(false);
  const [countriesData, setcountriesData] = useState([]);
  const [phoneNumber, setphoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [otp, setotp] = useState("");
  const [otpField, setotpField] = useState(true);

  //error message
  const [errorMsg, seterrorMsg] = useState("");

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
      seterrorMsg("");
      setloader(true);
      const no = `+${countryCode}${phoneNumber}`;
      const triggerOtp = await loginApi(no);
      console.log("triggerOtp===>", triggerOtp);
      if (triggerOtp?.status === false) {
        alert(triggerOtp?.message);
        setloader(false);
      } else if (triggerOtp?.status === true) {
        setotpField(false);
        setloader(false);
      } else {
        alert("Something went wrong ");
        setloader(false);
      }
    }

    //navigate("/dashboard", { replace: true });
  };

  //verify otp
  const verifyOtp = async () => {
    //navigate('dashboard/clubs')
    const no = `+${countryCode}${phoneNumber}`;
    if (otp >= 6) {
      setloader(true);

      const verifyNumber = await otpVerify(no, otp);
      console.log("verifyNumber---->", verifyNumber);
      if (verifyNumber != undefined) {
        if (verifyNumber === "Otp expired") {
          setloader(false);
          setotp("");
          seterrorMsg("Otp Expired !");
        } else if (verifyNumber === "verification failed") {
          setloader(false);
          setotp("");
          seterrorMsg("Wrong Otp!");
        } else {
          localStorage.setItem(
            LocalStorageKey.USER_DATA,
            JSON.stringify(verifyNumber.data)
          );
          getRepresentativeData(verifyNumber.data._id);
          //6401d17b49bfe3eb406e6b8b

          // localStorage.setItem(
          //   LocalStorageKey.USER_DATA,
          //   JSON.stringify(verifyNumber.data)
          // );
          getRepresentativeData(verifyNumber.data._id);

          seterrorMsg("");
        }
      } else {
        setloader(false);
        setotp("");
        seterrorMsg("Technical Error ,Contact Support ! ");
      }
    } else {
      seterrorMsg("Please enter the 6 digit valid otp");
    }
  };

  //get representative Data

  const getRepresentativeData = async (id) => {
    const data = await getProfileData(id);
   
    localStorage.setItem(LocalStorageKey.USER_DATA, JSON.stringify(data));
    localStorage.setItem(LocalStorageKey.USER_ID, JSON.stringify(data._id));

    console.log("data====>", data);
    if (data._id.length != undefined) {
      setloader(false);
      setotp("");

      navigate("/dashboard/clubs");
    } else {
      setloader(false);
      setotp("");
      seterrorMsg("Technical Error ,Contact Support ! ");
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
            autoComplete="off"
            className={styles.textField}
            // name="phone"
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
            <Typography
              style={{
                color: "#E4D0B5",
                paddingTop: 6,
              }}
            >
              Please enter the 6 digit otp{" "}
            </Typography>
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
              numInputs={6}
              separator={<span>-</span>}
            />

            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              {errorMsg.length > 0 ? (
                <>
                  <Typography
                    style={{
                      color: "red",
                      paddingTop: 6,
                    }}
                  >
                    {errorMsg}
                  </Typography>
                </>
              ) : (
                ""
              )}
              {errorMsg === "Otp Expired !" ? (
                <>
                  {" "}
                  <Button
                    onClick={() => {
                      handleClick();
                    }}
                    style={{ color: "#E4D0B5" }}
                  >
                    Resend Otp
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </>
      )}

      <Stack sx={{ paddingTop: 4 }}></Stack>
      <LoadingButton
        style={{
          color: "black",
          backgroundColor: "#E4D0B5",
        }}
        loading={loader === true ? true : false}
        loadingIndicator={
          <CircularProgress
            size={32}
            sx={{
              color: "black",
              marginLeft: "10px",
            }}
          />
        }
        fullWidth
        size="large"
        color="info"
        type="submit"
        variant="outlined"
        onClick={() => {
          loader === false
            ? otpField === true
              ? handleClick()
              : verifyOtp()
            : null;
          // getRepresentativeData();
        }}
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
