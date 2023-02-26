import axios, * as others from "axios";

export const loginApi = async (no) => {
  try {
    var data = JSON.stringify({
      phoneNumberParam: no,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}auth/generateOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log("config===>", config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const otpVerify = async (no) => {
  console.log("no =====>", no);
  try {
    var data = JSON.stringify({
      reqPhoneNumber: no,
      reqOtp: "989402",
      isrepresentative: true,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}api/auth/verifyOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log("config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {}
};
