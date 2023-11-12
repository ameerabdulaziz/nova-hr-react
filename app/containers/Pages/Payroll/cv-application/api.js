import axiosInstance from '../api/axios';
const API = (locale) => {
  const api = {};

  api.GetJobList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetList/${locale}`
    );

    return response.data;
  };

  return api;
};

export default API;
