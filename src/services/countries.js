import axios, * as others from "axios";

// const REACT_APP_BASE_URL = "http://192.168.1.3:3000/api/";
const REACT_APP_BASE_URL = 'http://192.168.1.3:3000/api/'



export const getCountries = async () => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${REACT_APP_BASE_URL}auth/getCountryCodes`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });

}