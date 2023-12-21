import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      'AsTemplate/GetList/'
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `AsTemplate/GetAllData/${locale}?id=${id}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AsTemplate', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AsTemplate/${id}`);
    return data;
  };

  return api;
};

export default API;
