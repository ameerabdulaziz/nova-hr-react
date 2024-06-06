import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`/TrFunctions/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`TrFunctions/Get/${id}/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('TrFunctions/Save', body);

    return data;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`TrFunctions/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
