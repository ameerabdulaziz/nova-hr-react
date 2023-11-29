import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/GetSecList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.Save = async (body) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/Save/${body.appFirstStatus}?reason=${body.reason}`,
      body.ids
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
