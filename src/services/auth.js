import { PostRequest } from "../utils/axios/Axios";

export const loginApi = async (obj) => {
  const data = await PostRequest(
    `${process.env.REACT_APP_BASE_URL}auth/generateOTP`,
    obj
  );
  return data;
};

export const otpVerify = async (obj) => {
  const data = await PostRequest(
    `${process.env.REACT_APP_BASE_URL}auth/verifyOTP`,
    obj
  );

  return data;
};
