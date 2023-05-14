import axios, * as others from "axios";



//IMAGE UPLOAD 
export const AddImage = (obj) => {
    return new Promise((resolve, reject) => {
      try {
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}fileUpload/file`,
  
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: obj,
        };
  
        console.log("config===>", config);
        axios(config)
          .then((response) => {
            console.log("response", response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
            resolve(error);

          });
      } catch (error) {
        return error;
      }
    });
  };