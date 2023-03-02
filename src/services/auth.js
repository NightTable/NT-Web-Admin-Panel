import axios, * as others from "axios";

export const loginApi =  (no) => {
  return new Promise(async(resolve, reject) => {
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
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error);
          reject(error.message)
        });
    } catch (error) {
      reject(error.message)
    }
  })
  
};

export const otpVerify = async (no , reqOtp) => {
  console.log("no =====>", no);
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
