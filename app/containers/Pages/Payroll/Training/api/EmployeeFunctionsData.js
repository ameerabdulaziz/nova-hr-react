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

  api.isQualifiedEmployee = async (params) => {
    const data = await axiosInstance.get('TrFunctions/IsQualifiedEmployee', {
      params,
    });

    return data.data;
  };

  api.saveEmployeeFunctionsRequest = async (body) => {
    const data = await axiosInstance.post(
      '/TrEmployeeFunctionsRequest/Save',
      body
    );

    return data;
  };

  return api;
};

export default API;
