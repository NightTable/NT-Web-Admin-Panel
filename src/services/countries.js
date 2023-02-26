import axios, * as others from "axios";

export const getCountries = async () => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}auth/getCountryCodes`,
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
};

export const getStatesOfCountry = async (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}auth/getStatesOfCountry`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
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
};

export const citiesOfStates = async (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}auth/citiesOfStates`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
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
};
