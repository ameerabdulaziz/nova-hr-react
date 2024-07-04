import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.getList = async (trainingId, params) => {
    const data = await axiosInstance.get(
      `TrainingReport/GetTranningAttReport/${locale}/${trainingId}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default API;
