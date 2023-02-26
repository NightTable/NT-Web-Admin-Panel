import axios, * as others from "axios";

export const getClubs = async () => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}clubs/clubs`,
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
  return new Promise(async (resolve, reject) => {
    try {
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}clubs/createClub`,
        headers: {
          "Content-Type": "application/json",
        },
        data: obj,
      };
      // console.log("config====>", config);
  
      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve( response.data)
        })
        .catch(function (error) {
          console.log("error",error);
          return error
  
        });
    } catch (error) {
      return error
    }
  })
  
};

export const clubUpdate = async (obj, clubId) => {
  try {
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}clubs/club/${clubId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        console.log("response",response)

        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {}
};


export const deleteClub = async (obj, clubId) => {
  try {
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}clubs/club/${clubId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    console.log("config===>",config)
    axios(config)
      .then(function (response) {

        console.log("response",response)
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    return error
  }
};



export const AddClubImage = (obj) =>{
  try {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}fileUpload/file`,
      
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: obj,
    };

    console.log("config===>",config)
    axios(config)
      .then(function (response) {

        console.log("response",response.data)
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    return error
  }
}