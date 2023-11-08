import axios, * as others from 'axios';

export const GetRequest = async (session_url, body, params, header = null) => {
  const startTime = performance.now();

  try {
    let config = '';
    if (body) {
      config = {
        method: 'get',
        url: session_url,
        body
      };
    } else if (params) {
      config = {
        method: 'get',
        url: session_url,
        params
      };
    } else if (header) {
      config = {
        method: 'get',
        url: session_url,
        headers: header
      };
    } else {
      config = {
        method: 'get',
        url: session_url
      };
    }
    const resultAxios = await axios(config);
    const endTime = performance.now();
    console.log(`Call ${session_url} ${endTime - startTime} milliseconds.`);

    return resultAxios;
  } catch (error) {
    return error;
  }
};

export const PostRequest = async (session_url, body, token = null) => {
  console.log('session_url, body, params, header = null', session_url);
  let config;
  if (token) {
    config = {
      headers: {
        token
      }
    };
  } else {
    config = '';
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
        token
      }
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
        token
      }
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
        token
      }
    };
  }
  try {
    return await axios.put(session_url, body, config);
  } catch (error) {
    return error;
  }
};