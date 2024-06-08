import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async (params) => {
    const data = await axiosInstance.get(
      `TrEmployeeFunctionsRequest/GetReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default API;
