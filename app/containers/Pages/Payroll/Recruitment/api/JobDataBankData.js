import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`RecJobDataBank/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (id) => {
    const data = await axiosInstance.post(`RecJobDataBank/Save/${id}`);

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
