import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getByTypeId = async (typeId) => {
    const data = await axiosInstance.get(`Survey/Get/${locale}/${typeId}`);

    return data.data;
  };

  return api;
};

export default API;
