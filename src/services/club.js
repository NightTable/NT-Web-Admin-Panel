import axios, * as others from "axios";

// const REACT_APP_BASE_URL = "http://192.168.1.3:3000/api/";
const REACT_APP_BASE_URL = "http://192.168.2.20:3000/api/";

export const getClubs = async () => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${REACT_APP_BASE_URL}clubs/clubs`,
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

export const addClubtoServer = async (obj) => {
  try {
    var config = {
      method: "post",
      url: `${REACT_APP_BASE_URL}clubs/createClub`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };
    console.log("config====>", config);

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

export const clubUpdate = async (obj, clubId) => {
  try {
    var config = {
      method: "put",
      url: `${REACT_APP_BASE_URL}clubs/club/${clubId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {}
};
