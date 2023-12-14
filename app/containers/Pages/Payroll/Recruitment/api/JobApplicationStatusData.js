import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async (params) => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/GetReport/${locale}`,
      {
        params,
      }
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
