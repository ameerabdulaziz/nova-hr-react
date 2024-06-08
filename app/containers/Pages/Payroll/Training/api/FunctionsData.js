import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getAllFunctionWithEmployees = async (params) => {
    const data = await axiosInstance.get(
      `TrFunctions/GetAllFunctionWithEmployees/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default API;
