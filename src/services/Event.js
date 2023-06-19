import axios, * as others from "axios";

//GET ALL THE CLUBS EVENT
export const getEventofClub = async (clubId, obj) => {
  console.log(clubId, obj, "clubId, obj");
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}`,
      headers: {},
      data: obj,
    };
    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        if (error.message === "Request failed with status code 404") {
          resolve([]);
        } else {
          reject(error);
        }
      });
  });
};

//----SHOWING PARTICULAR EVENT ---//

//expect params  let obj ={ clubId:'',EventId:''}
export const ViewEvent = async (obj) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${obj.clubId}/${obj.EventId}`,
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

//----ADD & EDIT EVENT  ---//
//EXPECT THIS Event
// let obj  = {
//       name: "new event",
//       picture: "jdkaHSFKASFIKANVAJ",
//       eventDate: "",
//       eventTime: "",
//       ticketLink: "",
//       clubId: "",
//     }
export const addEventtoDb = async (obj, clubId) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const editEvent = async (obj, clubId, EventId) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}/${EventId}`,
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

//DELETE EVENT BY CLUB
export const deleteEvent = async (clubId, EventId) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}/${EventId}`,
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



export const updateEventToDB = async (clubId, EventId, data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}events/club/${clubId}/${EventId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data:data
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