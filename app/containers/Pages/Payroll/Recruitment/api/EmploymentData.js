import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`RecEmployment/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (params,body) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.post(
      `RecEmployment/Save?${queryString.toString()}`,
      body
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
