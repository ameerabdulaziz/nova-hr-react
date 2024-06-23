import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getQualificationCheck = async (params) => {
    const data = await axiosInstance.get(
      `TrTrainingTrx/GetQualificationCheck/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.GetNewEmployee = async () => {
    const data = await axiosInstance.get(
      `TrTrainingTrx/GetNewEmployee/${locale}`);

    return data.data;
  };

  return api;
};

export default API;
