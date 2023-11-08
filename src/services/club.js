import axios, * as others from 'axios';
import { GetRequest, PostRequest } from '../utils/axios/Axios';

export const getClubs = async () => {
  try {
    const response = await GetRequest(
      `${process.env.REACT_APP_BASE_URL}clubs/clubs`,
      '',
      ''
    );
    console.log('response.data',response.data);
    return response.data;
  } catch (error) {}
};

export const getClubDetails = async (club_id) => {
  const config = {
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}clubs/club/${club_id}`,
    headers: {}
  };

  const data = await axios(config);
  return data;
};
export const addClubtoServer = async (obj) => {
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}clubs/createClub`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  };

  const apiCall = await axios(config);
  return apiCall?.data;
};

export const clubUpdate = async (obj, clubId) => new Promise((resolve, reject) => {
    try {
      const config = {
        method: 'put',
        url: `${process.env.REACT_APP_BASE_URL}clubs/club/${clubId}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      };
      console.log('config=====>', config);

      axios(config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });

export const deleteClub = async (obj, clubId) => {
  try {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}clubs/club/${clubId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: obj
    };

    console.log('config===>', config);
    axios(config)
      .then((response) => {
        console.log('response', response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};
