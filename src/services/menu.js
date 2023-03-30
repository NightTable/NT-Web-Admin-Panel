import axios, * as others from "axios";

//CREATE MENU
export const createMenuforClub = async (obj) => {
  return new Promise(async (resolve, reject) => {

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}menu/createMenu`,

      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};


//GET MENU OF CLUB
export const getMenuforClub = async (club_id) => {
    return new Promise(async (resolve, reject) => {
  
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}menu/club/${club_id}`,
  
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      axios(config)
        .then(function (response) {
          resolve(response.data.data);
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  };