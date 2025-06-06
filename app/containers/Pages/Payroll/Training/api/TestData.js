import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getByTrainingId = async (trainingId) => {
    const data = await axiosInstance.get(`Test/Get/${locale}/${trainingId}`);

    return data.data;
  };

  api.save = async (trainingEmpId, body) => {
    const data = await axiosInstance.post('Test/save', body,{
      params: {
        trainingEmpId
      }
    });

    return data.data;
  };

  return api;
};

export default API;
