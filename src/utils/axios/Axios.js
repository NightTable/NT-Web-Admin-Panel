import axios, * as others from "axios";

export const GetRequest = async (session_url, body, params, header = null) => {
  var startTime = performance.now();

  try {
    var config = "";
    if (body) {
      config = {
        method: "get",
        url: session_url,
        body: body,
      };
    } else if (params) {
      config = {
        method: "get",
        url: session_url,
        params: params,
      };
    } else if (header) {
      config = {
        method: "get",
        url: session_url,
        headers: header,
      };
    } else {
      config = {
        method: "get",
        url: session_url,
      };
    }
    var resultAxios = await axios(config);
    var endTime = performance.now();
    console.log(`Call ${session_url} ${endTime - startTime} milliseconds.`);

    return resultAxios;
  } catch (error) {
    return error;
  }
};

export const PostRequest = async (session_url, body, token = null) => {
  console.log("session_url, body, params, header = null", session_url);
  var config;
  if (token) {
    config = {
      headers: {
        token: token,
      },
    };
  } else {
    config = "";
  }
  try {
    return await axios.post(session_url, body, config);
  } catch (error) {
    return error;
  }
};

export const PatchRequest = async (session_url, body, token = null) => {
  if (token) {
    var config = {
      headers: {
        token: token,
      },
    };
  }
  try {
    return await axios.patch(session_url, body, config);
  } catch (error) {
    return error;
  }
};
export const DeleteRequest = async (session_url, body, token = null) => {
  if (token) {
    var config = {
      headers: {
        token: token,
      },
    };
  }
  try {
    return await axios.delete(session_url, body, config);
  } catch (error) {
    return error;
  }
};

export const PutRequest = async (session_url, body, token = null) => {
  if (token) {
    var config = {
      headers: {
        token: token,
      },
    };
  }
  try {
    return await axios.put(session_url, body, config);
  } catch (error) {
    return error;
  }
};