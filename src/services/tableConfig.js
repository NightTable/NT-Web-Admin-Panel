import axios, * as others from 'axios';
import { DeleteRequest, PostRequest, PutRequest } from 'src/utils/axios/Axios';

// GET INDIVDUAL EVENT TABLE CONFIG
export const getEventConfigsData = async (clubId, eventId) => new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}/${eventId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

// CREATE TABLE CONFIGURATION
export const createTableConfig = async (obj) => {
  const data = await PostRequest(
    `${process.env.REACT_APP_BASE_URL}tableconfigurations/club/${obj.clubId}`,
    obj
  );
  return data;
};

// CREATE TABLE CONFIGURATION
export const deleteTableConfig = async (obj) => {
  const data = await DeleteRequest(
    `${process.env.REACT_APP_BASE_URL}tableconfigurations/${obj.tableconfigId}`,
    obj
  );
  return data;
};
// CREATE TABLE CONFIGURATION
export const updateTableConfig = async (tableconfigId, obj) => {
  const data = await PutRequest(
    `${process.env.REACT_APP_BASE_URL}tableconfigurations/${tableconfigId}`,
    obj
  );
  return data;
};
