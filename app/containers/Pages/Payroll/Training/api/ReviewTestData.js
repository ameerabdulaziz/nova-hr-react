import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.getByTrainingId = async (trainingId, employeeId) => {
    const data = await axiosInstance.get(`test/ReviewTest/${locale}/${trainingId}/${employeeId}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('Test/SaveReview', body);

    return data.data;
  };

  return api;
};

export default API;
