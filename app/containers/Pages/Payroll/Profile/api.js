import axiosInstance from '../api/axios';
const API = (locale) => {
  const api = {};

  api.GetInfo = async () => {
    const data = await axiosInstance.get(`EmpProfile/GetInfo/${locale}`);

    return data.data;
  };

  api.GetEmployeeDocList = async () => {
    const data = await axiosInstance.get(`MdCompanyDocument/GetEmployeeDocList/${locale}`);

    return data.data;
  };

  return api;
};

export default API;
