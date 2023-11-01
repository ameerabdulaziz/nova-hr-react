import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`AttEmployeeOverTimeReq/GetList/${locale}`);
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`AttEmployeeOverTimeReq/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post(
      'AttEmployeeOverTimeReq/Save',
      body
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AttEmployeeOverTimeReq/Delete/${id}`);
    return data;
  };

  return api;
};

export default API;
