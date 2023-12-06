import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobApplicationInterview/GetHRList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobApplicationInterview/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      'RecJobApplicationInterview/SaveHR',
      body
    );

    const result = data.data;

    return result;
  };

  api.SendRejectionMail = async (id) => {
    const data = await axiosInstance.post(
      `RecJobApplicationInterview/SendRejectionMail/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
