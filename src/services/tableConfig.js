import axios, * as others from "axios";

//CREATE TABLE CONFIGURATION
export const createTableConfig = async (obj) => {
    return new Promise((resolve, reject) => {
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}tableconfigurations/club/${obj.clubId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: obj,
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
  