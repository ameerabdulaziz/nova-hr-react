import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getAttendance = async (params) => {
    const data = await axiosInstance.get(
      `TrTrainingTrx/GetAttendance/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      '/TrTrainingTrx/SaveAttendance',
      body
    );

    return data;
  };

  return api;
};

export default API;
