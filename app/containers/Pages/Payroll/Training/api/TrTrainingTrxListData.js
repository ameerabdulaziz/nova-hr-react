import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`TrTrainingTrx/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`TrTrainingTrx/Get/${id}/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('TrTrainingTrx/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`TrTrainingTrx/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
