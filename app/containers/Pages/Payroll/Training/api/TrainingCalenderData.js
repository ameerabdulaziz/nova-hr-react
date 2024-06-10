import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`TrTrainingTrx/GetList/${locale}`);

    return data.data;
  };

  return api;
};

export default API;
