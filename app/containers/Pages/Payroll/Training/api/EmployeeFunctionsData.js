import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async (params) => {
    const data = await axiosInstance.get(
      `TrFunctions/GetFunctionEmployees/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.save = async (employees, params) => {
    const data = await axiosInstance.post(
      'TrFunctions/SaveFunctionEmployees',
      employees,
      {
        params,
      }
    );

    return data;
  };

  return api;
};

export default API;
