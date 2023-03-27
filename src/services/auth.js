import axios, * as others from "axios";

export const loginApi = (no) => {
  return new Promise(async (resolve, reject) => {
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

      axios(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

export const otpVerify = async (no, reqOtp) => {
  return new Promise((resolve, reject) => {
    try {
      var data = JSON.stringify({
        reqPhoneNumber: no,
        reqOtp: reqOtp,
        isrepresentative: true,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}auth/verifyOTP`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch(function (error) {
          // console.log("error==>", error.response.data.message);
          resolve(error.response.data.message);
        });
    } catch (error) {
      reject("Network Error");
    }
  });
};
