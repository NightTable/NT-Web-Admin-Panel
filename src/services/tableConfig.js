import axios, * as others from "axios";
import { PostRequest } from "src/utils/axios/Axios";

//GET INDIVDUAL EVENT TABLE CONFIG
export const getEventConfigsData = async (clubId, eventId) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}/${eventId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

//CREATE TABLE CONFIGURATION
export const createTableConfig = async (obj) => {
  const data = await PostRequest(
    `${process.env.REACT_APP_BASE_URL}tableconfigurations/club/${obj.clubId}`,
    obj
  );

  return data;
};
