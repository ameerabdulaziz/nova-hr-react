import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getByTypeId = async (typeId, params) => {
    const data = await axiosInstance.get(`Survey/Get/${locale}/${typeId}`, {
      params,
    });

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('Survey/save', body);

    return data.data;
  };

  return api;
};

export default API;
